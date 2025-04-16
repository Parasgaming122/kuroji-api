import { Injectable } from '@nestjs/common'
import { Anilist, Poster, Prisma, Shikimori } from '@prisma/client'
import { AnilistWithRelations } from '../service/anilist.service'
import { BasicAnilist, BasicAnilistSmall, BasicShikimori } from '../model/BasicAnilist'
import { PrismaService } from '../../../prisma.service'

@Injectable()
export class AnilistHelper {
  constructor(private readonly prisma: PrismaService) {}

  public getDataForPrisma(anime: any): Prisma.AnilistCreateInput {
    return {
      id: anime.id,
      idMal: anime.idMal,
      siteUrl: anime.siteUrl,
      title: {
        create: {
          romaji: anime.title?.romaji ?? null,
          english: anime.title?.english ?? null,
          native: anime.title?.native ?? null,
        }
      },
      coverImage: {
        create: {
          color: anime.coverImage?.color ?? null,
          large: anime.coverImage?.large ?? null,
          medium: anime.coverImage?.medium ?? null,
          extraLarge: anime.coverImage?.extraLarge ?? null
        }
      },
      bannerImage: anime.bannerImage,
      status: anime.status,
      type: anime.type,
      format: anime.format,
      updatedAt: anime.updatedAt,
      description: anime.description,
      startDate: {
        create: {
          day: anime.startDate?.day ?? null,
          month: anime.startDate?.month ?? null,
          year: anime.startDate?.year ?? null
        }
      },
      endDate: {
        create: {
          day: anime.endDate?.day ?? null,
          month: anime.endDate?.month ?? null,
          year: anime.endDate?.year ?? null
        }
      },
      season: anime.season,
      seasonYear: anime.seasonYear,
      episodes: anime.episodes,
      duration: anime.duration,
      countryOfOrigin: anime.countryOfOrigin,
      isLicensed: anime.isLicensed,
      source: anime.source,
      hashtag: anime.hashtag,
      moreInfo: anime.moreInfo,
      trailer: anime.trailer ? {
        create: {
          id: anime.trailer?.id ?? null,
          site: anime.trailer?.site ?? null,
          thumbnail: anime.trailer?.thumbnail ?? null
        }
      } : undefined,
      isLocked: anime.isLocked,
      isAdult: anime.isAdult,
      averageScore: anime.averageScore,
      meanScore: anime.meanScore,
      score: ((anime.meanScore ?? 0) + (anime.averageScore ?? 0)) / 2,
      popularity: anime.popularity,
      trending: anime.trending,
      favourites: anime.favourites,
      genres: anime.genres,
      synonyms: anime.synonyms,
      recommendations: {
        create: anime.recommendations?.edges?.map((edge: any) => ({
          id: edge?.node?.mediaRecommendation.id ?? null,
          idMal: edge?.node?.mediaRecommendation.idMal ?? null
        })) ?? []
      },
      characters: {
        create: anime.characters?.edges?.map((edge: any) => ({
          characterId: edge?.node?.id ?? null,
          name: edge?.node?.name?.full ?? null,
          image: edge?.node?.image?.medium ?? null
        })) ?? []
      },
      studios: {
        create: anime.studios?.edges?.map((edge: any) => ({
          studioId: edge?.node?.id ?? null,
          name: edge?.node?.name ?? null,
          isMain: edge?.isMain ?? false
        })) ?? []
      },
      airingSchedule: {
        create: anime.airingSchedule?.edges?.map((edge: any) => ({
          scheduleId: edge?.node?.id ?? null,
          episode: edge?.node?.episode ?? null,
          airingAt: edge?.node?.airingAt ?? null
        })) ?? []
      },
      nextAiringEpisode: anime.nextAiringEpisode ? {
        create: {
          episode: anime.nextAiringEpisode?.episode ?? null,
          airingAt: anime.nextAiringEpisode?.airingAt ?? null,
          timeUntilAiring: anime.nextAiringEpisode?.timeUntilAiring ?? null
        }
      } : undefined,
      // stats: {
      //   create: {
      //     scoreDistribution: {
      //       create: {
      //         score: anime.stats.scoreDistribution.score,
      //         amount: anime.stats.scoreDistribution.amount,
      //       },
      //     },
      //   },
      // },
      stats: anime.stats ?? [],
      tags: {
        create: anime.tags?.map((tag: any) => ({
          name: tag.name,
          description: tag.description ?? null,
          category: tag.category ?? null,
          rank: tag.rank ?? null,
          isGeneralSpoiler: tag.isGeneralSpoiler ?? false,
          isMediaSpoiler: tag.isMediaSpoiler ?? false,
          isAdult: tag.isAdult ?? false,
          userId: tag.userId ?? null,
        }))
      },
      externalLinks: {
        create: anime.externalLinks?.map((link: any) => ({
          exLinkId: link.id ?? null,
          url: link.url ?? null,
          site: link.site ?? null,
          siteId: link.siteId ?? null,
          type: link.type ?? null,
          language: link.language ?? null,
          color: link.color ?? null,
          icon: link.icon ?? null,
          notes: link.notes ?? null,
          isDisabled: link.isDisabled ?? false
        })) ?? []
      },
      streamingEpisodes: {
        create: anime.streamingEpisodes?.map((episode: any) => ({
          title: episode.title ?? null,
          thumbnail: episode.thumbnail ?? null,
          url: episode.url ?? null,
          site: episode.site ?? null
        })) ?? []
      },
    }
  }

  public convertAnilistToBasic(anilist: any): BasicAnilist {
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
      moreInfo: anilist.moreInfo ?? undefined,
      startDate: anilist.startDate ?? undefined,
      season: anilist.season ?? undefined,
      seasonYear: anilist.seasonYear ?? undefined,
      episodes: anilist.episodes ?? undefined,
      episodesAired: (anilist as any).episodesAired ?? undefined,
      duration: anilist.duration ?? undefined,
      countryOfOrigin: anilist.countryOfOrigin ?? undefined,
      popularity: anilist.popularity ?? undefined,
      favourites: anilist.favourites ?? undefined,
      score: anilist.score ?? undefined,
      isLocked: anilist.isLocked ?? undefined,
      isAdult: anilist.isAdult ?? undefined,
      genres: anilist.genres ?? undefined,
      nextAiringEpisode: anilist.nextAiringEpisode ?? undefined,
      shikimori: this.convertShikimoriToBasic(anilist.shikimori)
    }
  }

  public convertBasicToBasicSmall(anilist: any): BasicAnilistSmall {
    return {
      id: anilist.id,
      idMal: anilist.idMal ?? undefined,
      siteUrl: anilist.siteUrl ?? undefined,
      title: anilist.title ?? undefined,
      coverImage: anilist.coverImage ?? undefined,
      type: anilist.type ?? undefined,
      format: anilist.format ?? undefined,
      status: anilist.status ?? undefined,
      startDate: anilist.startDate ?? undefined,
      season: anilist.season ?? undefined,
      seasonYear: anilist.seasonYear ?? undefined,
      episodes: anilist.episodes ?? undefined,
      episodesAired: (anilist as any).episodesAired ?? undefined,
      duration: anilist.duration ?? undefined,
      score: anilist.score ?? undefined,
      isLocked: anilist.isLocked ?? undefined,
      isAdult: anilist.isAdult ?? undefined,
      shikimori: this.convertShikimoriToBasic(anilist.shikimori)
    }
  }

  public convertShikimoriToBasic(shikimori?: Shikimori): BasicShikimori | undefined {
    if (!shikimori) {
      return undefined
    }
    return {
      id: shikimori.id,
      malId: shikimori.malId ?? undefined,
      url: shikimori.url ?? undefined,
      franchise: shikimori.franchise ?? undefined,
      poster: shikimori.poster as Poster ?? undefined
    }
  }

  public getFindUnique(id: number): any {
    const findUnique = {
      omit: {
        recommendations: true,
      },
      where: { id },
      include: this.getInclude(),
    }

    return findUnique;
  }

  public getInclude(): any {
    const include = {
      title: {
        omit: {
          id: true,
          releaseId: true,
        }
      },
      coverImage: {
        omit: {
          id: true,
          releaseId: true,
        }
      },
      startDate: {
        omit: {
          id: true,
          releaseId: true,
        }
      },
      endDate: {
        omit: {
          id: true,
          releaseId: true,
        }
      },
      trailer: {
        omit: {
          releaseId: true,
        }
      },
      characters: {
        omit: {
          releaseId: true,
        }
      },
      studios: {
        omit: {
          releaseId: true,
        }
      },
      airingSchedule: {
        omit: {
          releaseId: true,
        }
      },
      nextAiringEpisode: {
        omit: {
          releaseId: true,
        }
      },
      tags: {
        omit: {
          releaseId: true,
        }
      },
      externalLinks: {
        omit: {
          releaseId: true,
        }
      },
      streamingEpisodes: {
        omit: {
          releaseId: true,
        }
      },
    }

    return include;
  }
}