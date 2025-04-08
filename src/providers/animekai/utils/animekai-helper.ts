import { Injectable } from '@nestjs/common';
import { AnimeKai, Prisma } from '@prisma/client';

@Injectable()
export class AnimeKaiHelper {
  getAnimekaiData(anime: AnimeKai): Prisma.AnimeKaiCreateInput {
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
      episodes: anime.episodes || [],
    };
  }
}
