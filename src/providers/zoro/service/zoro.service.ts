import { Injectable } from '@nestjs/common';
import { EpisodeZoro, Title, Zoro } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../../providers/anilist/service/anilist.service'
import { ScrapeHelper } from '../../../scrapper/scrape-helper'
import { Source } from '../../../shared/Source'
import { TmdbService } from '../../tmdb/service/tmdb.service'

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

@Injectable()
export class ZoroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly tmdbService: TmdbService,
    private readonly http: CustomHttpService,
    private readonly helper: ZoroHelper
  ) {}

  async getZoro(id: string): Promise<Zoro> {
    const existingZoro = await this.prisma.zoro.findUnique({
      where: { id: id },
    });

    if (!existingZoro) {
      const zoro = await this.fetchZoro(id);
      return this.saveZoro(zoro);
    }
    return existingZoro;
  }

  async getZoroByAnilist(id: number): Promise<Zoro> {
    const existingZoro = await this.prisma.zoro.findFirst({
      where: { alID: id },
    });

    if (!existingZoro) {
      const zoro = await this.findZoroByAnilist(id);
      return this.saveZoro(zoro);
    }
    return existingZoro;
  }

  async saveZoro(zoro: Zoro): Promise<Zoro> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: zoro.id,
        type: UpdateType.ANIWATCH,
      },
    });

    return this.prisma.zoro.create({
      data: this.helper.getZoroData(zoro),
    });
  }

  async update(id: string): Promise<Zoro> {
    const existingZoro = await this.prisma.zoro.findFirst({
      where: { id },
    });

    if (!existingZoro) {
      throw new Error('Zoro not found');
    }

    const zoro = await this.fetchZoro(id);
    zoro.alID = existingZoro.alID || 0;

    if (existingZoro?.episodes !== zoro.episodes) {
      const tmdb = await this.tmdbService.getTmdbByAnilist(zoro.alID);

      if (tmdb) {
        await this.tmdbService.update(tmdb.id);
      }
    }

    return this.saveZoro(zoro);
  }

  async getSource(episodeId: string, dub: boolean): Promise<Source> {
    const zoro = await this.http.getResponse(UrlConfig.ZORO + 'watch/' + episodeId + '?dub=' + dub);
    return zoro as Source;
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
