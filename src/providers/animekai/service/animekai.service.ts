import { Injectable } from '@nestjs/common';
import { AnimeKai } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ScrapeHelper } from '../../../scrapper/scrape-helper';
import { Source } from '../../../shared/Source';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../anilist/service/anilist.service';
import { AnimeKaiHelper } from '../utils/animekai-helper';
import { TmdbService } from '../../tmdb/service/tmdb.service'

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
    private readonly tmdbService: TmdbService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: AnimeKaiHelper,
  ) {}

  async getAnimekaiByAnilist(id: number): Promise<AnimeKai> {
    const existingAnimekai = await this.prisma.animeKai.findFirst({
      where: { anilistId: id },
    });

    if (existingAnimekai) {
      return existingAnimekai;
    }

    const animekai = await this.findAnimekai(id);
    return this.saveAnimekai(animekai);
  }

  async getSources(episodeId: string, dub: boolean): Promise<Source> {
    return this.customHttpService.getResponse(
      UrlConfig.ANIMEKAI + 'watch/' + episodeId + '?dub=' + dub,
    );
  }

  async saveAnimekai(animekai: AnimeKai): Promise<AnimeKai> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animekai.id,
        type: UpdateType.ANIMEKAI,
      },
    });

    return await this.prisma.animeKai.upsert({
      where: { id: animekai.id },
      update: this.helper.getAnimekaiData(animekai),
      create: this.helper.getAnimekaiData(animekai),
    });
  }

  async update(id: string): Promise<AnimeKai> {
    const existingAnimekai = await this.prisma.animeKai.findFirst({
      where: { id },
    });

    const animekai = await this.fetchAnimekai(id);

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
