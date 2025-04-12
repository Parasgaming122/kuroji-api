import { Poster, Title, CoverImage, AiringEpisode, DateDetails } from '@prisma/client'
import { JsonObject, JsonValue } from '@prisma/client/runtime/library'

export interface BasicShikimori {
  id?: string;
  malId?: string;
  url?: string;
  poster?: Poster;
}

export interface BasicAnilist {
  id: number;
  idMal?: number;

  siteUrl?: string;
  title?: JsonValue;

  synonyms?: string[];

  bannerImage?: string;
  coverImage?: JsonValue;

  type?: string;
  format?: string;
  status?: string;
  description?: string;

  startDate?: JsonValue;

  season?: string;
  seasonYear?: number;

  episodes?: number;
  episodesAired?: number;
  duration?: number;

  countryOfOrigin?: string;
  popularity?: number;
  favourites?: number;

  averageScore?: number;
  meanScore?: number;

  isLocked?: boolean;
  isAdult?: boolean;

  genres?: string[];

  nextAiringEpisode?: JsonValue;

  shikimori?: BasicShikimori;
}

export interface BasicAnilistSmall {
  id: number
  idMal?: number

  siteUrl?: string
  title?: JsonValue

  coverImage?: JsonValue

  type?: string
  format?: string
  status?: string

  startDate?: JsonValue

  season?: string
  seasonYear?: number

  episodes?: number
  episodesAired?: number
  duration?: number

  averageScore?: number
  meanScore?: number

  isLocked?: boolean
  isAdult?: boolean

  shikimori?: BasicShikimori
}