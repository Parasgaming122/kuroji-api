import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AnimekaiWithRelations } from '../service/animekai.service';

@Injectable()
export class AnimeKaiHelper {
  getAnimekaiData(anime: AnimekaiWithRelations): Prisma.AnimeKaiCreateInput {
    const episodes = anime?.episodes as Prisma.AnimekaiEpisodeCreateInput[];
    return {
      id: anime.id,
      anilistId: anime.anilistId,
      title: anime.title,
      japaneseTitle: anime.japaneseTitle,
      image: anime.image,
      description: anime.description,
      type: anime.type,
      url: anime.url,
      subOrDub: anime.subOrDub,
      hasSub: anime.hasSub,
      hasDub: anime.hasDub,
      status: anime.status,
      season: anime.season,
      totalEpisodes: anime.totalEpisodes,
      episodes: {
        create: episodes.map((ep) => ({
          id: ep.id,
          number: ep.number,
          title: ep.title,
          isFiller: ep.isFiller,
          isSubbed: ep.isSubbed,
          isDubbed: ep.isDubbed,
          url: ep.url,
        })),
      },
    };
  }
}
