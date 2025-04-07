import { Injectable } from '@nestjs/common';
import { Animepahe, AnimepaheEpisode } from '@prisma/client'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnimePaheHelper } from '../utils/animepahe-helper'
import { AnilistService } from '../../anilist/service/anilist.service'
import { UpdateType } from '../../../shared/UpdateType'
import { UrlConfig } from '../../../configs/url.config'
import { ScrapeHelper } from '../../../scrapper/scrape-helper'
import { ZoroWithRelations } from '../../zoro/service/zoro.service'
import { Source } from '../../../shared/Source'

export interface AnimepaheWithRelations extends Animepahe {
  episodes: AnimepaheEpisode[];
}

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

@Injectable()
export class AnimepaheService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: AnimePaheHelper,
  ) {}

  async getAnimepaheByAnilist(id: number): Promise<AnimepaheWithRelations | null> {
    const existingAnimepahe = await this.prisma.animepahe.findFirst({
      where: { alId: id },
      include: {
        episodes: true,
      },
    });

    if (existingAnimepahe) {
      return existingAnimepahe;
    }

    const animepahe = await this.findAnimepahe(id);
    return this.saveAnimepahe(animepahe);
  }

  async getSources(episodeId: string): Promise<Source> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEPAHE + "watch/" + episodeId) as unknown as Source;
  } 

  async saveAnimepahe(animepahe: AnimepaheWithRelations): Promise<AnimepaheWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animepahe.id,
        type: UpdateType.ANIMEPAHE,
      },
    });
    
    return this.prisma.animepahe.create({
      data: this.helper.getAnimePaheData(animepahe),
      include: {
        episodes: true,
      },
    });
  }
  
  async fetchAnimepahe(id: string): Promise<AnimepaheWithRelations> { 
    return this.customHttpService.getResponse(UrlConfig.ANIMEPAHE + "info/" + id);
  }

  async searchAnimepahe(q: string): Promise<AnimepaheResponse> {
    return this.customHttpService.getResponse(UrlConfig.ANIMEPAHE + q);
  }

  async findAnimepahe(id: number): Promise<AnimepaheWithRelations> {
    const anilist = await this.anilistService.getAnilist(id);
    const searchResult = await this.searchAnimepahe((anilist.title as { romaji: string }).romaji);
  
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
              const data = await this.fetchAnimepahe(result.id);
              data.alId = id;
              return data;
            }
    }

    return Promise.reject(new Error('Animepahe not found'));
  }
}
