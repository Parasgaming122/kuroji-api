import { Injectable } from '@nestjs/common'
import { TmdbSeasonWithRelations, TmdbWithRelations } from '../service/tmdb.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class TmdbHelper {
  getTmdbData(tmdb: any): Prisma.TmdbCreateInput {
    return {
      id: tmdb.id,
      adult: tmdb.adult ?? false,
      backdropPath: tmdb.backdrop_path ?? undefined,
      episodeRunTime: tmdb.episode_run_time ?? [],
      firstAirDate: tmdb.first_air_date ?? undefined,
      homepage: tmdb.homepage ?? undefined,
      inProduction: tmdb.in_production ?? undefined,
      lastAirDate: tmdb.last_air_date ?? undefined,
      name: tmdb.name ?? undefined,
      numberOfEpisodes: tmdb.number_of_episodes ?? undefined,
      numberOfSeasons: tmdb.number_of_seasons ?? undefined,
      originalLanguage: tmdb.original_language ?? undefined,
      originalName: tmdb.original_name ?? undefined,
      originCountry: tmdb.origin_country ?? [],
      overview: tmdb.overview ?? undefined,
      popularity: tmdb.popularity ?? undefined,
      posterPath: tmdb.poster_path ?? undefined,
      tagline: tmdb.tagline ?? undefined,
      status: tmdb.status ?? undefined,
      type: tmdb.type ?? undefined,
      voteAverage: tmdb.vote_average ?? undefined,
      voteCount: tmdb.vote_count ?? undefined,
      seasons: tmdb.seasons ? {
        create: tmdb.seasons.map((season: any) => ({
          id: season.id,
          airDate: season.air_date ?? undefined,
          episodeCount: season.episode_count ?? undefined,
          name: season.name ?? undefined,
          overview: season.overview ?? undefined,
          posterPath: season.poster_path ?? undefined,
          seasonNumber: season.season_number ?? undefined,
          voteAverage: season.vote_average ?? undefined
        }))
      } : undefined
    }
  }

  getTmdbSeasonData(tmdb: any): Prisma.TmdbSeasonCreateInput {
    return {
      id: tmdb.id,
      airDate: tmdb.air_date ?? undefined,
      showId: tmdb.show_id ?? undefined,
      name: tmdb.name ?? undefined,
      overview: tmdb.overview ?? undefined,
      posterPath: tmdb.poster_path ?? undefined,
      seasonNumber: tmdb.season_number ?? undefined,
      voteAverage: tmdb.vote_average ?? undefined,
      episodes: tmdb.episodes ? {
        create: tmdb.episodes.map((episode: any) => ({
          id: episode.id,
          airDate: episode.air_date ?? undefined,
          episodeNumber: episode.episode_number ?? undefined,
          episodeType: episode.episode_type ?? undefined,
          name: episode.name ?? undefined,
          overview: episode.overview ?? undefined,
          productionCode: episode.production_code ?? undefined,
          runtime: episode.runtime ?? undefined,
          seasonNumber: episode.season_number ?? undefined,
          showId: episode.show_id ?? undefined,
          stillPath: episode.still_path ?? undefined,
          voteAverage: episode.vote_average ?? undefined,
          voteCount: episode.vote_count ?? undefined
        }))
      } : undefined
    }
  }
}