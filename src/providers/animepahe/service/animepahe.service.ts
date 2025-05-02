import { Injectable } from '@nestjs/common';
import { Animepahe, AnimepaheEpisode, AnimepaheExternalLink } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ScrapeHelper } from '../../../scrapper/scrape-helper';
import { Source } from '../../stream/model/Source';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../anilist/service/anilist.service';
import { AnimePaheHelper } from '../utils/animepahe-helper';
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'

export interface BasicAnimepahe {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
  type: string;
}

export interface AnimepaheResponse {
  results: BasicAnimepahe[];
}
export interface AnimepaheWithRelations extends Animepahe {
  externalLinks: AnimepaheExternalLink[],
  episodes: AnimepaheEpisode[],
}

@Injectable()
export class AnimepaheService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly tmdbService: TmdbService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: AnimePaheHelper,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getAnimepaheByAnilist(id: number): Promise<AnimepaheWithRelations | null> {
    const existingAnimepahe = await this.prisma.animepahe.findFirst({
      where: { alId: id },
      include: {
        externalLinks: true,
        episodes: true,
      }
    });

    if (existingAnimepahe) {
      return existingAnimepahe;
    }

    const animepahe = await this.findAnimepahe(id);
    return this.saveAnimepahe(animepahe as AnimepaheWithRelations);
  }

  async getSources(episodeId: string): Promise<Source> {
    const key = `animepahe:sources:${episodeId}`

    const cached = await this.redis.get(key)
    if (cached) {
      return JSON.parse(cached) as Source
    }

    const animepahe = await this.customHttpService.getResponse(
      UrlConfig.ANIMEPAHE + 'watch?episodeId=' + episodeId,
    );

    await this.redis.set(
      key,
      JSON.stringify(animepahe),
      'EX',
      process.env.SOURCES_REDIS_TIME ? parseInt(process.env.SOURCES_REDIS_TIME) : 3600
    );

    return animepahe as Source;
  }

  async saveAnimepahe(animepahe: Animepahe): Promise<AnimepaheWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animepahe.id,
        externalId: animepahe.alId,
        type: UpdateType.ANIMEPAHE,
      },
    });

    await this.prisma.animepahe.upsert({
      where: { id: animepahe.id },
      update: this.helper.getAnimePaheData(animepahe),
      create: this.helper.getAnimePaheData(animepahe),
    });

    return await this.prisma.animepahe.findFirst({
      where: { id: animepahe.id },
      include: {
        externalLinks: true,
        episodes: true,
      }
    }) as unknown as AnimepaheWithRelations;
  }

  async update(id: string): Promise<AnimepaheWithRelations> {
    const existingAnimepahe = await this.prisma.animepahe.findFirst({
      where: { id },
      include: { episodes: true }
    });

    const animepahe = await this.fetchAnimepahe(id) as AnimepaheWithRelations;

    if (!animepahe) {
      return Promise.reject(new Error('Animepahe not found'));
    }
    
    animepahe.alId = existingAnimepahe?.alId || 0;

    if (existingAnimepahe?.episodes !== animepahe.episodes) {
      const tmdb = await this.tmdbService.getTmdbByAnilist(animepahe.alId);

      if (tmdb) {
        await this.tmdbService.update(tmdb.id);
      }
    }

    return await this.saveAnimepahe(animepahe);
  }

  async fetchAnimepahe(id: string): Promise<Animepahe> {
    return this.customHttpService.getResponse(
      UrlConfig.ANIMEPAHE + 'info/' + id,
    );
  }

  async searchAnimepahe(q: string): Promise<AnimepaheResponse> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEPAHE + q);
  }

  async findAnimepahe(id: number): Promise<Animepahe> {
    const anilist = await this.anilistService.getAnilist(id);
    const searchResult = await this.searchAnimepahe(
      (anilist.title as { romaji: string }).romaji,
    );

    for (const result of searchResult.results) {
      if (
        ScrapeHelper.compareTitlesSimple(
          (anilist.title as { romaji: string }).romaji,
          (anilist.title as { english: string }).english,
          (anilist.title as { native: string }).native,
          anilist.synonyms,
          result.title,
        )
      ) {
        const data = await this.fetchAnimepahe(result.id) as AnimepaheWithRelations;
        const externalLinks = data.externalLinks;

        if (externalLinks.find(l => l.sourceName === 'AniList' && l.id === String(id))) {
          data.alId = id;
          return data;
        }
      }
    }

    return Promise.reject(new Error('Animepahe not found'));
  }
}
