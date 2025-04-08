import { Injectable } from '@nestjs/common';
import { Prisma, Shikimori } from '@prisma/client';

export type CreateShikimoriData = Prisma.ShikimoriCreateInput;

@Injectable()
export class ShikimoriHelper {
  public getDataForPrisma(anime: Shikimori): CreateShikimoriData {
    return {
      id: anime.id,
       malId: anime.malId,
       name: anime.name,
       russian: anime.russian,
       licenseNameRu: anime.licenseNameRu,
       english: anime.english,
       japanese: anime.japanese,
       synonyms: anime.synonyms,
       kind: anime.kind,
       rating: anime.rating,
       score: anime.score,
       status: anime.status,
       episodes: anime.episodes,
       episodesAired: anime.episodesAired,
       duration: anime.duration,
       url: anime.url,
       season: anime.season,
       createdAt: anime.createdAt,
       updatedAt: anime.updatedAt,
       nextEpisodeAt: anime.nextEpisodeAt,
       screenshots: anime.screenshots || [],
       chronology: anime.chronology || [],
       videos: anime.videos || [],
       airedOn: anime.airedOn || [],
       releasedOn: anime.releasedOn || [],
       poster: anime.poster || [],
    };
  }
}
