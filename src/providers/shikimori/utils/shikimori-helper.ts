import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ShikimoriWithRelations } from './../service/shikimori.service';

export type CreateShikimoriData = Prisma.ShikimoriCreateInput;

@Injectable()
export class ShikimoriHelper {
  public getDataForPrisma(anime: ShikimoriWithRelations): CreateShikimoriData {
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
      screenshots: {
        create: anime.screenshots?.map((s) => ({
          originalUrl: s.originalUrl,
          x166Url: s.x166Url,
          x332Url: s.x332Url,
        })),
      },
      chronology: {
        create: anime.chronology?.map((c) => ({
          id: parseInt(c.id.toString()),
          malId: parseInt(c.malId?.toString() as string),
        })),
      },
      videos: {
        create: anime.videos?.map((v) => ({
          videoId: v.videoId,
          videoImageUrl: v.videoImageUrl,
          kind: v.kind,
          videoName: v.videoName,
          playerUrl: v.playerUrl,
          videoUrl: v.videoUrl,
        })),
      },
      airedOn: anime.airedOn
        ? {
            create: {
              id: anime.airedOn.id,
              year: anime.airedOn.year,
              month: anime.airedOn.month,
              day: anime.airedOn.day,
              date: anime.airedOn.date,
            },
          }
        : undefined,
      releasedOn: anime.releasedOn
        ? {
            create: {
              year: anime.releasedOn.year,
              month: anime.releasedOn.month,
              day: anime.releasedOn.day,
              date: anime.releasedOn.date,
            },
          }
        : undefined,
      poster: anime.poster
        ? {
            create: {
              originalUrl: anime.poster.originalUrl,
              mainUrl: anime.poster.mainUrl,
            },
          }
        : undefined,
    };
  }
}
