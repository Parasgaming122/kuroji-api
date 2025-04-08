import { Injectable } from '@nestjs/common'
import { Prisma, Tmdb, TmdbSeason } from '@prisma/client'

@Injectable()
export class TmdbHelper {
  getTmdbData(tmdb: Tmdb): Prisma.TmdbCreateInput {
    return {
      id: tmdb.id,
      adult: tmdb.adult ?? false,
      backdrop_path: tmdb.backdrop_path ?? undefined,
      episode_run_time: tmdb.episode_run_time ?? [],
      media_type: tmdb.media_type ?? undefined,
      first_air_date: tmdb.first_air_date ?? undefined,
      homepage: tmdb.homepage ?? undefined,
      in_production: tmdb.in_production ?? undefined,
      last_air_date: tmdb.last_air_date ?? undefined,
      name: tmdb.name ?? undefined,
      number_of_episodes: tmdb.number_of_episodes ?? undefined,
      number_of_seasons: tmdb.number_of_seasons ?? undefined,
      original_language: tmdb.original_language ?? undefined,
      original_name: tmdb.original_name ?? undefined,
      origin_country: tmdb.origin_country ?? [],
      overview: tmdb.overview ?? undefined,
      popularity: tmdb.popularity ?? undefined,
      poster_path: tmdb.poster_path ?? undefined,
      tagline: tmdb.tagline ?? undefined,
      status: tmdb.status ?? undefined,
      type: tmdb.type ?? undefined,
      vote_average: tmdb.vote_average ?? undefined,
      vote_count: tmdb.vote_count ?? undefined,
      seasons: tmdb.seasons || []
    }
  }

  getTmdbSeasonData(tmdb: TmdbSeason): Prisma.TmdbSeasonCreateInput {
    return {
      id: tmdb.id,
      air_date: tmdb.air_date ?? undefined,
      show_id: tmdb.show_id ?? undefined,
      name: tmdb.name ?? undefined,
      overview: tmdb.overview ?? undefined,
      poster_path: tmdb.poster_path ?? undefined,
      season_number: tmdb.season_number ?? undefined,
      vote_average: tmdb.vote_average ?? undefined,
      episodes: tmdb.episodes || [],
    }
  }
}