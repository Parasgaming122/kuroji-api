import { Injectable } from '@nestjs/common';
import { AnimeKai, AnimekaiEpisode } from '@prisma/client'
import { AnimeKaiHelper } from '../utils/animekai-helper'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { UpdateType } from '../../../shared/UpdateType'
import { UrlConfig } from '../../../configs/url.config'
import { ScrapeHelper } from '../../../scrapper/scrape-helper'
import { Source } from '../../../shared/Source'

export interface AnimekaiWithRelations extends AnimeKai {
  episodes: AnimekaiEpisode[];
}

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

@Injectable()
export class AnimekaiService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly anilistService: AnilistService,
      private readonly customHttpService: CustomHttpService,
      private readonly helper: AnimeKaiHelper,
  ) {}

  async getAnimekaiByAnilist(id: number): Promise<AnimekaiWithRelations> {
    const existingAnimekai = await this.prisma.animeKai.findFirst({
      where: { anilistId: id },
      include: {
        episodes: true,
      },
    });

    if (existingAnimekai) {
      return existingAnimekai;
    }

    const animekai = await this.findAnimekai(id);
    return this.saveAnimekai(animekai);
  }

  async getSources(episodeId: string, dub: boolean): Promise<Source> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEKAI + 'watch/' + episodeId + '?dub=' + dub);
  }

  async saveAnimekai(animekai: AnimekaiWithRelations): Promise<AnimekaiWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animekai.id,
        type: UpdateType.ANIMEKAI,
      },
    });

    return await this.prisma.animeKai.create({
      data: this.helper.getAnimekaiData(animekai),
      include: {
        episodes: true,
      },
    });
  }

  async fetchAnimekai(id: string): Promise<AnimekaiWithRelations> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEKAI + "info?id=" + id)
  }

  async searchAnimekai(query: string): Promise<AnimekaiResponse> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEKAI + query);
  }

  async findAnimekai(id: number): Promise<AnimekaiWithRelations> {
      const anilist = await this.anilistService.getAnilist(id);
      const searchResult = await this.searchAnimekai((anilist.title as { romaji: string }).romaji);
    
      for (const result of searchResult.results) {
        if (
                ScrapeHelper.compareTitlesSimple(
                  (anilist.title as { romaji: string }).romaji,
                  (anilist.title as { english: string }).english,
                  (anilist.title as { native: string }).native,
                  anilist.synonyms,
                  result.title
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
