import { Injectable } from '@nestjs/common';
import { TvdbHelper } from '../utils/tvdb-helper'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { TvdbTokenService } from './token/tvdb.token.service'
import { TVDB } from '../../../configs/tvdb.config'
import { Tvdb, TvdbAirDays, TvdbAlias, TvdbArtwork, TvdbLanguage, TvdbLanguageTranslation, TvdbRemoteId, TvdbTrailer } from '@prisma/client'
import { UpdateType } from '../../../shared/UpdateType'

export interface BasicTvdb {
  id: number,
  name: string,
  slug: string,
  image: string,
}

export interface SearchResponse {
  data: {
    movie: BasicTvdb,
    series: BasicTvdb,
    episode: BasicTvdb
  }[],
  status: string
}

export interface RemoteId {
  id: string,
  type: number,
  sourceName: string,
}

export interface TvdbWithRelations extends Tvdb {
  status: TvdbStatus,
  aliases: TvdbAlias[],
  artworks: TvdbArtwork[],
  remoteIds: TvdbRemoteId[],
  trailers: TvdbTrailer[],
  airDays: TvdbAirDays,
}

export enum TvdbStatus {
  Continuing = "Continuing",
  Ended = "Ended",
  Cancelled = "Cancelled",
  Pilot = "Pilot"
}

@Injectable()
export class TvdbService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly tmdbService: TmdbService,
      private readonly tokenService: TvdbTokenService,
      private readonly anilistService: AnilistService,
      private readonly customHttpService: CustomHttpService,
      private readonly helper: TvdbHelper,
  ) {}

  async getTvdb(id: number): Promise<TvdbWithRelations> {
    const existingTvdb = await this.prisma.tvdb.findUnique({
      where: { id },
      include: this.helper.getInclude()
    }) as unknown as TvdbWithRelations;

    if (existingTvdb) return existingTvdb;

    const tvdb = await this.fetchTvdb(id, await this.detectType(id));

    return await this.saveTvdb(tvdb as TvdbWithRelations);
  }

  async getTvdbByAnilist(id: number): Promise<TvdbWithRelations> {
    const tmdb = await this.tmdbService.getTmdbByAnilist(id);

    const existingTvdb = await this.prisma.tvdb.findFirst({
      where: {
        tmdbId: tmdb.id
      },
      include: this.helper.getInclude()
    }) as unknown as TvdbWithRelations;

    if (!existingTvdb) {
      const basicTvdb = await this.fetchByRemoteId(String(tmdb.id), tmdb.media_type || 'series');

      if (!basicTvdb) {
        return Promise.reject(Error('Not found'));
      }

      const tvdb = await this.fetchTvdb(basicTvdb.id, tmdb.type || 'series');
      tvdb.type = tmdb.type;
      tvdb.tmdbId = tmdb.id;
      return await this.saveTvdb(tvdb as TvdbWithRelations);
    }

    return existingTvdb;
  }

  async getTranslations(id: number, translation: string): Promise<TvdbLanguageTranslation> {
    const tvdb = await this.getTvdbByAnilist(id);

    const existingTranslation = await this.prisma.tvdbLanguageTranslation.findFirst({
      where: {
        tvdbId: tvdb.id,
        language: translation
      }
    });

    if (existingTranslation) return existingTranslation;

    const tmdb = await this.tmdbService.getTmdbByAnilist(id);

    const translations = await this.fetchTranslations(tvdb.id, tmdb.media_type || 'series', translation);
    translations.tvdbId = tvdb.id;
    return await this.saveTranslation(translations);
  }

  async getLanguages(): Promise<TvdbLanguage[]> {
    const existingLanguages = await this.prisma.tvdbLanguage.findMany({}) as TvdbLanguage[];

    if (existingLanguages.length > 0) return existingLanguages;

    const languages = await this.fetchLanguages();

    return await this.saveLanguages(languages);
  }

  async saveTvdb(tvdb: TvdbWithRelations): Promise<TvdbWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: String(tvdb.id),
        externalId: tvdb.id,
        type: UpdateType.TVDB,
      },
    });

    await this.prisma.tvdb.upsert({
      where: { id: tvdb.id },
      update: this.helper.getTvdbData(tvdb),
      create: this.helper.getTvdbData(tvdb)
    });

    return await this.prisma.tvdb.findUnique({
      where: { id: tvdb.id },
      include: this.helper.getInclude()
    }) as unknown as TvdbWithRelations;
  }

  async saveTranslation(translation: TvdbLanguageTranslation): Promise<TvdbLanguageTranslation> {
    return await this.prisma.tvdbLanguageTranslation.create({
      data: this.helper.getTvdbLanguageTranslationData(translation)
    });
  }

  async update(id: number) {
    const existingTvdb = this.prisma.tvdb.findFirst({
      where: { id },
      include: this.helper.getInclude()
    }) as unknown as TvdbWithRelations;

    const tvdb = await this.fetchTvdb(id, existingTvdb.type || 'series') as TvdbWithRelations;

    if (tvdb.artworks != existingTvdb.artworks) {
      await this.saveTvdb(tvdb);
    }
  }

  async updateLanguages(): Promise<TvdbLanguage[]> {
    const languages = await this.fetchLanguages();
    return await this.saveLanguages(languages);
  }

  async saveLanguages(languages: TvdbLanguage[]): Promise<TvdbLanguage[]> {
    await this.prisma.tvdbLanguage.createMany({
      data: languages.map(language => this.helper.getTvdbLanguageData(language)),
      skipDuplicates: true
    });

    return await this.prisma.tvdbLanguage.findMany({
      where: {
        id: {
          in: languages.map(lang => lang.id)
        }
      }
    });
  }

  async fetchByRemoteId(id: string, type: string): Promise<BasicTvdb> {
    const searchResponse = await this.customHttpService.getResponse(
      TVDB.getRemoteId(id),
      {
        headers: {
          Authorization: `Bearer ${await this.tokenService.getToken()}`,
        },
      },
    ) as SearchResponse;

    if (!searchResponse || !searchResponse.data || searchResponse.data.length === 0) {
      return Promise.reject(Error("Not found"));
    }

    const match = searchResponse.data.find(item => type === 'movie' ? item.movie : item.series);
    if (!match) {
      return Promise.reject(Error("Not found"));
    }

    return type === 'movie' ? match.movie : match.series;
  }

  async fetchTvdb(id: number, type: string): Promise<TvdbWithRelations> {
    const url = type === 'movie' ? TVDB.getMovie(id) : TVDB.getSeries(id);

    return await this.customHttpService.getResponse(
      url,
      {
        headers: {
          Authorization: `Bearer ${await this.tokenService.getToken()}`,
        },
      },
      'data'
    );
  }

  async fetchTranslations(id: number, type: string, translations: string): Promise<TvdbLanguageTranslation> {
    const url = type === 'movie' ? TVDB.getMovieTranslations(id, translations) : TVDB.getSeriesTranslations(id, translations);

    return await this.customHttpService.getResponse(
      url,
      {
        headers: {
          Authorization: `Bearer ${await this.tokenService.getToken()}`,
        },
      },
      'data'
    );
  }

  async fetchLanguages(): Promise<TvdbLanguage[]> {
    return await this.customHttpService.getResponse(
      TVDB.getLanguages(),
      {
        headers: {
          Authorization: `Bearer ${await this.tokenService.getToken()}`,
        },
      },
      'data'
    );
  }

  async detectType(id: number): Promise<string> {
      try {
        await this.customHttpService.getResponse(TVDB.getSeries(id));
        return 'tv';
      } catch (e1) {
        try {
          await this.customHttpService.getResponse(TVDB.getMovie(id));
          return 'movie';
        } catch (e2) {
          throw new Error('ID not found in TMDb as Movie or TV Show.');
        }
      }
    }
}
