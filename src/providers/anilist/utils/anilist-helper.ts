import { Injectable } from '@nestjs/common'

@Injectable()
export class AnilistHelper {
  public getDataForPrisma(anime: any): any {
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
    }
  }
}