import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AnimepaheWithRelations } from '../service/animepahe.service';

@Injectable()
export class AnimePaheHelper {
  getAnimePaheData(
    animePahe: AnimepaheWithRelations,
  ): Prisma.AnimepaheCreateInput {
    const episodes = animePahe.episodes as Prisma.AnimepaheEpisodeCreateInput[];
    return {
      id: animePahe.id,
      alId: animePahe.alId,
      title: animePahe.title,
      image: animePahe.image,
      cover: animePahe.cover,
      hasSub: animePahe.hasSub,
      status: animePahe.status,
      type: animePahe.type,
      releaseDate: animePahe.releaseDate,
      totalEpisodes: animePahe.totalEpisodes,
      episodePages: animePahe.episodePages,
      episodes: animePahe.episodes || [],
    };
  }
}
