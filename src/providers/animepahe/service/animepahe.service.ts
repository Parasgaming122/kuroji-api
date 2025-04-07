import { Injectable } from '@nestjs/common';
import { Animepahe } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ScrapeHelper } from '../../../scrapper/scrape-helper';
import { Source } from '../../../shared/Source';
import { UpdateType } from '../../../shared/UpdateType';
import { AnilistService } from '../../anilist/service/anilist.service';
import { AnimePaheHelper } from '../utils/animepahe-helper';

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

  async getAnimepaheByAnilist(id: number): Promise<Animepahe | null> {
    const existingAnimepahe = await this.prisma.animepahe.findFirst({
      where: { alId: id },
    });

    if (existingAnimepahe) {
      return existingAnimepahe;
    }

    const animepahe = await this.findAnimepahe(id);
    return this.saveAnimepahe(animepahe);
  }

  async getSources(episodeId: string): Promise<Source> {
    return await this.customHttpService.getResponse(
      UrlConfig.ANIMEPAHE + 'watch/' + episodeId,
    );
  }

  async saveAnimepahe(animepahe: Animepahe): Promise<Animepahe> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: animepahe.id,
        type: UpdateType.ANIMEPAHE,
      },
    });

    return this.prisma.animepahe.create({
      data: this.helper.getAnimePaheData(animepahe),
    });
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
        const data = await this.fetchAnimepahe(result.id);
        data.alId = id;
        return data;
      }
    }

    return Promise.reject(new Error('Animepahe not found'));
  }
}
