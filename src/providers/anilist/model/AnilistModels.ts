import { Anilist, AnilistTitle, AnilistCover, StartDate, EndDate, AnilistTrailer, AnilistCharacter, AnilistStudio, AnilistAiringSchedule, AnilistNextAiringEpisode, AnilistTag, AnilistExternalLink, AnilistStreamingEpisode, Shikimori } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { PageInfo } from '../graphql/types/PageInfo'
import { BasicAnilistSmall } from './BasicAnilist'

export interface AnilistResponse {
  Page: {
    media: Anilist[];
    pageInfo: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
  };
}

export interface FranchiseResponse<T> {
  franchise: Franchise
  data: T
  pageInfo: PageInfo
}

export interface SearcnResponse<T> {
  franchise: any
  data: T
  pageInfo: PageInfo
}

export interface MoreInfoResponse {
  data: {
    moreinfo?: string
  }
}

export interface AnilistWithRelations extends Anilist {
  title?: AnilistTitle;
  cover?: AnilistCover;
  startDate?: StartDate;
  endDate?: EndDate;
  trailer?: AnilistTrailer;
  characters?: AnilistCharacter[];
  studios?: AnilistStudio[];
  airingSchedule?: AnilistAiringSchedule[];
  nextAiringEpisode?: AnilistNextAiringEpisode;
  tags?: AnilistTag[];
  externalLinks?: AnilistExternalLink[];
  streamingEpisodes?: AnilistStreamingEpisode[];
  shikimori?: Shikimori;
}

export interface Franchise {
  cover?: string,
  banner?: string,
  title?: JsonValue,
  franchise?: string,
  description?: string,
}

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type Schedule = {
  [key in Weekday]: ScheduleData
}

export interface ScheduleData {
  current: boolean
  data: BasicAnilistSmall[]
}