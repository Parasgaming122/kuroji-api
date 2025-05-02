import { Injectable } from '@nestjs/common';
import { EpisodeZoro, Title, Zoro } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../../providers/anilist/service/anilist.service'
import { ScrapeHelper } from '../../../scrapper/scrape-helper'
import { Source } from '../../stream/model/Source'
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'

export interface BasicZoro {
  id: string;
  title: string;
  url: string;
  image: string;
  japaneseTitle: string;
}

export interface ZoroResponse {
  results: BasicZoro[];
}

export interface ZoroWithRelations extends Zoro {
  episodes: EpisodeZoro[]
}

@Injectable()
export class ZoroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly tmdbService: TmdbService,
    private readonly http: CustomHttpService,
    private readonly helper: ZoroHelper,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getZoro(id: string): Promise<ZoroWithRelations> {
    const existingZoro = await this.prisma.zoro.findUnique({
      where: { id: id },
      include: {
        episodes: true
      }
    });

    if (!existingZoro) {
      const zoro = await this.fetchZoro(id);
      return this.saveZoro(zoro as ZoroWithRelations);
    }
    return existingZoro;
  }

  async getZoroByAnilist(id: number): Promise<ZoroWithRelations> {
    const existingZoro = await this.prisma.zoro.findFirst({
      where: { alID: id },
      include: {
        episodes: true
      }
    });

    if (!existingZoro) {
      const zoro = await this.findZoroByAnilist(id);
      return this.saveZoro(zoro as ZoroWithRelations);
    }
    return existingZoro;
  }

  async saveZoro(zoro: ZoroWithRelations): Promise<ZoroWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: zoro.id,
        externalId: zoro.alID,
        type: UpdateType.ANIWATCH,
      },
    });

    await this.prisma.zoro.create({
      data: this.helper.getZoroData(zoro),
    });

    return await this.prisma.zoro.findUnique({
      where: { id: zoro.id },
      include: {
        episodes: true
      }
    }) as unknown as ZoroWithRelations;
  }

  async update(id: string): Promise<ZoroWithRelations> {
    const existingZoro = await this.prisma.zoro.findFirst({
      where: { id },
      include: {
        episodes: true,
      }
    });

    if (!existingZoro) {
      throw new Error('Zoro not found');
    }

    const zoro = await this.fetchZoro(id) as ZoroWithRelations;
    zoro.alID = existingZoro.alID || 0;

    if (existingZoro?.episodes !== zoro.episodes) {
      const tmdb = await this.tmdbService.getTmdbByAnilist(zoro.alID);

      if (tmdb) {
        await this.tmdbService.update(tmdb.id);
      }

      const anilist = await this.anilistService.getAnilist(zoro.alID);
      await this.anilistService.updateAtAnilist(anilist);
    }

    return this.saveZoro(zoro);
  }

  async getSources(episodeId: string, dub: boolean): Promise<Source> {
    const key = `zoro:sources:${episodeId}:${dub ? 'dub' : 'sub'}`
    const cached = await this.redis.get(key)
    if (cached) {
      return JSON.parse(cached) as Source
    }

    const zoro = await this.http.getResponse(
      UrlConfig.ZORO + 'watch/' + episodeId + '?dub=' + dub
    )

    await this.redis.set(
      key, 
      JSON.stringify(zoro), 
      'EX', 
      process.env.SOURCES_REDIS_TIME ? parseInt(process.env.SOURCES_REDIS_TIME) : 3600
    );

    return zoro as Source
  }

  async fetchZoro(id: string): Promise<Zoro> {
    const zoro = await this.http.getResponse(UrlConfig.ZORO + 'info?id=' + id);

    return zoro as Promise<Zoro>;
  }

  async searchZoro(q: string): Promise<ZoroResponse> {
    const zoro = await this.http.getResponse(UrlConfig.ZORO + q);
    return zoro as Promise<ZoroResponse>;
  }
  
  async findZoroByAnilist(id: number): Promise<Zoro> {
    const anilist = await this.anilistService.getAnilist(id);
    const searchResult = await this.searchZoro((anilist.title as { romaji: string }).romaji);

    for (const z of searchResult.results) {
      if (
        ScrapeHelper.compareTitles(
          (anilist.title as { romaji: string }).romaji,
          (anilist.title as { english: string }).english,
          (anilist.title as { native: string }).native,
          anilist.synonyms,
          z.title,
          z.japaneseTitle
        )
      ) {
        const zoroData = await this.fetchZoro(z.id);
        if (zoroData.malID === anilist.idMal) {
          zoroData.alID = id;
          return zoroData as Zoro;
        }
      }
    }
    return Promise.reject(new Error('Zoro not found'));
  }
}
