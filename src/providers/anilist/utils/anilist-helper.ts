import { Injectable } from '@nestjs/common'
import { Anilist, Poster, Prisma, Shikimori } from '@prisma/client'
import { AnilistWithRelations } from '../service/anilist.service'
import { BasicAnilist, BasicShikimori } from '../model/BasicAnilist'
import { ShikimoriWithRelations } from 'src/providers/shikimori/service/shikimori.service'

@Injectable()
export class AnilistHelper {
  public getDataForPrisma(anime: any): Prisma.AnilistCreateInput {
    return {
      id: anime.id,
      idMal: anime.idMal,
      siteUrl: anime.siteUrl,
      title: anime.title,
      coverImage: anime.coverImage,
      bannerImage: anime.bannerImage,
      status: anime.status,
      type: anime.type,
      format: anime.format,
      updatedAt: anime.updatedAt,
      description: anime.description,
      startDate: anime.startDate,
      endDate: anime.endDate,
      season: anime.season,
      seasonYear: anime.seasonYear,
      episodes: anime.episodes,
      duration: anime.duration,
      countryOfOrigin: anime.countryOfOrigin,
      isLicensed: anime.isLicensed,
      source: anime.source,
      hashtag: anime.hashtag,
      trailer: anime.trailer,
      isLocked: anime.isLocked,
      isAdult: anime.isAdult,
      averageScore: anime.averageScore,
      meanScore: anime.meanScore,
      popularity: anime.popularity,
      trending: anime.trending,
      favourites: anime.favourites,
      genres: anime.genres,
      synonyms: anime.synonyms,
      recommendations: anime.recommendations,
      characters: anime.characters,
      studios: anime.studios,
      airingSchedule: anime.airingSchedule,
      nextAiringEpisode: anime.nextAiringEpisode,
      stats: anime.stats,
      // Handle relations
      tags: {
        create: anime.tags?.map((tag: any) => ({
          tagId: tag.id,
          name: tag.name,
          description: tag.description,
          category: tag.category,
          rank: tag.rank,
          isGeneralSpoiler: tag.isGeneralSpoiler,
          isMediaSpoiler: tag.isMediaSpoiler,
          isAdult: tag.isAdult,
          userId: tag.userId
        })) || []
      },
      externalLinks: {
        create: anime.externalLinks?.map((link: any) => ({
          exLinkId: link.id,
          url: link.url,
          site: link.site,
          siteId: link.siteId,
          type: link.type,
          language: link.language,
          color: link.color,
          icon: link.icon,
          notes: link.notes,
          isDisabled: link.isDisabled
        })) || []
      },
      streamingEpisodes: {
        create: anime.streamingEpisodes?.map((episode: any) => ({
          title: episode.title,
          thumbnail: episode.thumbnail,
          url: episode.url,
          site: episode.site
        })) || []
      },
      BasicIdAni: {
        create: anime.recommendations?.edges?.map((edge: any) => ({
          idMal: edge.node.mediaRecommendation.idMal
        })) || []
      }
    }
  }

  public convertAnilistToBasic(anilist: AnilistWithRelations): BasicAnilist {
    return {
      id: anilist.id,
      idMal: anilist.idMal ?? undefined,
      siteUrl: anilist.siteUrl ?? undefined,
      title: anilist.title ?? undefined,
      synonyms: anilist.synonyms ?? undefined,
      bannerImage: anilist.bannerImage ?? undefined,
      coverImage: anilist.coverImage ?? undefined,
      type: anilist.type ?? undefined,
      format: anilist.format ?? undefined,
      status: anilist.status ?? undefined,
      description: anilist.description ?? undefined,
      startDate: anilist.startDate ?? undefined,
      season: anilist.season ?? undefined,
      seasonYear: anilist.seasonYear ?? undefined,
      episodes: anilist.episodes ?? undefined,
      // If your Anilist model does not have episodesAired explicitly, you can omit or map it if available.
      episodesAired: (anilist as any).episodesAired ?? undefined,
      duration: anilist.duration ?? undefined,
      countryOfOrigin: anilist.countryOfOrigin ?? undefined,
      popularity: anilist.popularity ?? undefined,
      favourites: anilist.favourites ?? undefined,
      averageScore: anilist.averageScore ?? undefined,
      meanScore: anilist.meanScore ?? undefined,
      isLocked: anilist.isLocked ?? undefined,
      isAdult: anilist.isAdult ?? undefined,
      genres: anilist.genres ?? undefined,
      nextAiringEpisode: anilist.nextAiringEpisode ?? undefined,
      shikimori: this.convertShikimoriToBasic(anilist.shikimori)
    }
  }

  public convertShikimoriToBasic(shikimori?: ShikimoriWithRelations): BasicShikimori | undefined {
    if (!shikimori) {
      return undefined;
    }
    return {
      id: shikimori.id,
      malId: shikimori.malId ?? undefined,
      url: shikimori.url ?? undefined,
      poster: shikimori.poster as Poster ?? undefined
    }
  }
}