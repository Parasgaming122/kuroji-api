import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ShikimoriWithRelations } from './../service/shikimori.service';

export type CreateShikimoriData = Prisma.ShikimoriCreateInput;

@Injectable()
export class ShikimoriHelper {
  public getDataForPrisma(anime: ShikimoriWithRelations): CreateShikimoriData {
    return {
      id: anime.id,
      malId: anime.malId ?? undefined,
      name: anime.name ?? undefined,
      russian: anime.russian ?? undefined,
      licenseNameRu: anime.licenseNameRu ?? undefined,
      english: anime.english ?? undefined,
      japanese: anime.japanese ?? undefined,
      synonyms: anime.synonyms ?? undefined,
      kind: anime.kind ?? undefined,
      rating: anime.rating ?? undefined,
      score: anime.score ?? undefined,
      status: anime.status ?? undefined,
      episodes: anime.episodes ?? undefined,
      episodesAired: anime.episodesAired ?? undefined,
      duration: anime.duration ?? undefined,
      url: anime.url ?? undefined,
      season: anime.season ?? undefined,
      createdAt: anime.createdAt ?? undefined,
      updatedAt: anime.updatedAt ?? undefined,
      nextEpisodeAt: anime.nextEpisodeAt ?? undefined
    };
  }
}
