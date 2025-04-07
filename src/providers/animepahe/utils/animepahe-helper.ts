import { Injectable } from '@nestjs/common'
import { AnimepaheWithRelations } from '../service/animepahe.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class AnimePaheHelper {
  getAnimePaheData(animePahe: AnimepaheWithRelations): Prisma.AnimepaheCreateInput {
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
      episodes: {
        create: animePahe.episodes.map((ep) => ({
          id: ep.id,
          number: ep.number,
          title: ep.title,
          image: ep.image,
          duration: ep.duration,
          url: ep.url,
        })),
      },
    };
  }
}