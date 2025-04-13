import { Injectable } from '@nestjs/common';
import { TvdbHelper } from '../utils/tvdb-helper'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { TvdbTokenService } from './token/tvdb.token.service'
import { TVDB } from '../../../configs/tvdb.config'
import { Tvdb } from '@prisma/client'
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

  async getTvdb(id: number): Promise<Tvdb> {
    const existingTvdb = await this.prisma.tvdb.findUnique({
      where: { id }
    })

    if (existingTvdb) return existingTvdb;

    const tvdb = await this.fetchTvdb(id, await this.detectType(id));

    return await this.saveTvdb(tvdb);
  }

  async getTvdbByAnilist(id: number): Promise<Tvdb> {
    const tmdb = await this.tmdbService.getTmdbByAnilist(id);

    const existingTvdb = await this.prisma.tvdb.findFirst({
      where: {
        tmdbId: tmdb.id
      },
    });

    if (!existingTvdb) {
      console.log('tvdb is null')

      const basicTvdb = await this.fetchByRemoteId(String(tmdb.id));

      if (!basicTvdb) {
        return Promise.reject(Error('Not found'));
      }

      const tvdb = await this.fetchTvdb(basicTvdb.id, tmdb.type || 'series');
      tvdb.type = tmdb.type;
      tvdb.tmdbId = tmdb.id;
      return await this.saveTvdb(tvdb);
    }

    return existingTvdb;
  }

  async saveTvdb(tvdb: Tvdb): Promise<Tvdb> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: String(tvdb.id),
        externalId: tvdb.id,
        type: UpdateType.TVDB,
      },
    });

    return this.prisma.tvdb.upsert({
      where: { id: tvdb.id },
      update: this.helper.getTvdbData(tvdb),
      create: this.helper.getTvdbData(tvdb)
    })
  }

  async update(id: number) {
    const existingTvdb = this.prisma.tvdb.findFirst({
      where: { id }
    }) as unknown as Tvdb;

    const tvdb = await this.fetchTvdb(id, existingTvdb.type || 'series')

    if (tvdb !== existingTvdb) {
      await this.saveTvdb(tvdb);
    }
  }

  async fetchByRemoteId(id: string): Promise<BasicTvdb> {
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

    const match = searchResponse.data.find(item => item.series || item.movie);
    if (!match) {
      return Promise.reject(Error("Not found"));
    }

    return match.movie ? match.movie : match.series;
  }

  async fetchTvdb(id: number, type: string): Promise<Tvdb> {
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
