import { Injectable } from '@nestjs/common';
import { AnimeKai, AnimekaiEpisode } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ScrapeHelper } from '../../../scrapper/scrape-helper';
import { Source } from '../../stream/model/Source';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../anilist/service/anilist.service';
import { AnimeKaiHelper } from '../utils/animekai-helper';
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'

export interface BasicAnimekai {
  id: string;
  title: string;
  url: string;
  japaneseTitle: string;
  image: string;
  type: string;
}

export interface AnimekaiResponse {
  results: BasicAnimekai[];
}

export interface AnimekaiWithRelations extends AnimeKai {
  episodes: AnimekaiEpisode[]
}

@Injectable()
export class AnimekaiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly tmdbService: TmdbService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: AnimeKaiHelper,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getAnimekaiByAnilist(id: number): Promise<AnimekaiWithRelations> {
    const existingAnimekai = await this.prisma.animeKai.findFirst({
      where: { anilistId: id },
      include: { episodes: true }
    });

    if (existingAnimekai) {
      return existingAnimekai;
    }

    const animekai = await this.findAnimekai(id);
    return this.saveAnimekai(animekai as AnimekaiWithRelations);
  }

  async getSources(episodeId: string, dub: boolean): Promise<Source> {
    const key = `animekai:sources:${episodeId}:${dub ? 'dub' : 'sub'}`
    const cached = await this.redis.get(key)
    if (cached) {
      return JSON.parse(cached) as Source
    }

    const animekai = await this.customHttpService.getResponse(
      UrlConfig.ANIMEKAI + 'watch/' + episodeId + '?dub=' + dub
    )

    await this.redis.set(
      key,
      JSON.stringify(animekai),
      'EX',
      process.env.SOURCES_REDIS_TIME ? parseInt(process.env.SOURCES_REDIS_TIME) : 3600
    );

    return animekai as Source
  }

  async saveAnimekai(animekai: AnimekaiWithRelations): Promise<AnimekaiWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animekai.id,
        externalId: animekai.anilistId,
        type: UpdateType.ANIMEKAI,
      },
    });

    await this.prisma.animeKai.upsert({
      where: { id: animekai.id },
      update: this.helper.getAnimekaiData(animekai),
      create: this.helper.getAnimekaiData(animekai),
    });

    return await this.prisma.animeKai.findUnique({
      where: { id: animekai.id },
      include: { episodes: true }
    }) as unknown as AnimekaiWithRelations;
  }

  async update(id: string): Promise<AnimeKai> {
    const existingAnimekai = await this.prisma.animeKai.findFirst({
      where: { id },
      include: { episodes: true }
    });

    const animekai = await this.fetchAnimekai(id) as AnimekaiWithRelations;

    if (!animekai) {
      return Promise.reject(new Error('Animekai not found'));
    }

    animekai.anilistId = existingAnimekai?.anilistId ?? 0;

    if (existingAnimekai?.episodes !== animekai.episodes) {
      const tmdb = await this.tmdbService.getTmdbByAnilist(animekai.anilistId);

      if (tmdb) {
        await this.tmdbService.update(tmdb.id);
      }
    }

    return await this.saveAnimekai(animekai);
  }

  async fetchAnimekai(id: string): Promise<AnimeKai> {
    return this.customHttpService.getResponse(
      UrlConfig.ANIMEKAI + 'info?id=' + id,
    );
  }

  async searchAnimekai(query: string): Promise<AnimekaiResponse> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEKAI + query);
  }

  async findAnimekai(id: number): Promise<AnimeKai> {
    const anilist = await this.anilistService.getAnilist(id);
    const searchResult = await this.searchAnimekai(
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
        const data = await this.fetchAnimekai(result.id);
        data.anilistId = id;
        return data;
      }
    }

    return Promise.reject(new Error('Animekai not found'));
  }
}
