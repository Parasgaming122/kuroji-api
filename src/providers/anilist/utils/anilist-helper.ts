import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

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
}