import { Injectable } from '@nestjs/common';
import { Animepahe, Prisma } from '@prisma/client';

@Injectable()
export class AnimePaheHelper {
  getAnimePaheData(
    animePahe: Animepahe,
  ): Prisma.AnimepaheCreateInput {
    return {
      id: animePahe.id,
      alId: animePahe.alId,
      title: animePahe.title,
      image: animePahe.image,
      cover: animePahe.cover,
      hasSub: animePahe.hasSub,
      externalLinks: animePahe.externalLinks || [],
      status: animePahe.status,
      type: animePahe.type,
      releaseDate: animePahe.releaseDate,
      totalEpisodes: animePahe.totalEpisodes,
      episodePages: animePahe.episodePages,
      episodes: animePahe.episodes || [],
    };
  }
}
