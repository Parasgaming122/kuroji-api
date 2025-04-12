import { Injectable } from '@nestjs/common';
import { Anilist, BasicRelease, Shikimori, AnilistTitle, AnilistCover, StartDate, EndDate, AnilistTag, AnilistExternalLink, AnilistStreamingEpisode, AnilistStudio, AnilistAiringSchedule, AnilistNextAiringEpisode, AnilistCharacter, BasicIdAni, BasicIdShik } from '@prisma/client';
import { ApiResponse } from '../../../api/ApiResponse';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { UpdateType } from '../../../shared/UpdateType';
import {
  ShikimoriService,
} from '../../shikimori/service/shikimori.service';
import AnilistQL from '../graphql/AnilistQL';
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder';
import { BasicAnilist, BasicAnilistSmall } from '../model/BasicAnilist';
import { AnilistHelper } from '../utils/anilist-helper';
import { Filter } from '../model/Filter'
import { FilterDto } from '../model/FilterDto'

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

export interface MoreInfoResponse {
  data: {
    moreinfo?: string
  }
}

export interface AnilistWithRelations
  extends Anilist {
  title?: AnilistTitle;
  cover?: AnilistCover;
  startDate?: StartDate;
  endDate?: EndDate;
  characters?: AnilistCharacter[];
  studios?: AnilistStudio[];
  airingSchedule?: AnilistAiringSchedule[];
  nextAiringEpisode?: AnilistNextAiringEpisode;
  tags?: AnilistTag[];
  externalLinks?: AnilistExternalLink[];
  streamingEpisodes?: AnilistStreamingEpisode[];
  shikimori?: Shikimori;
}

@Injectable()
export class AnilistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: AnilistHelper,
    private readonly shikimoriService: ShikimoriService,
    private readonly customHttpService: CustomHttpService,
  ) {}

  async getAnilist(
    id: number,
    isMal: boolean = false,
  ): Promise<AnilistWithRelations> {
    const findUnique = {
      omit: {
        titleId: true,
        coverId: true,
        startDateId: true,
        endDateId: true,
        recommendations: true,
      },
      where: { id },
      include: {
        title: {
          omit: {
            id: true,
          }
        },
        coverImage: {
          omit: {
            id: true,
          }
        },
        startDate: {
          omit: {
            id: true,
          }
        },
        endDate: {
          omit: {
            id: true,
          }
        },
        characters: true,
        studios: true,
        airingSchedule: true,
        nextAiringEpisode: true,
        tags: true,
        externalLinks: true,
        streamingEpisodes: true,
      },
    }

    let existingAnilist = await this.prisma.anilist.findUnique(findUnique);

    if (existingAnilist) {
      return await this.adjustAnilist(existingAnilist);
    }

    const data = await this.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    await this.saveAnilist(data);

    existingAnilist = await this.prisma.anilist.findUnique(findUnique);

    if (!existingAnilist) {
      return Promise.reject(Error('Not found'))
    }
    
    return await this.adjustAnilist(existingAnilist);
  }

  async getAnilists(
    filter: FilterDto,
  ): Promise<ApiResponse<BasicAnilist[]>> {
    const response = await this.getAnilistByFilter(filter);

    const malIds = response.data
      .map((anilist) => anilist.idMal?.toString() || '')
      .join(',');
    const shikimoriData =
      await this.shikimoriService.saveMultipleShikimori(malIds);

    const data = response.data.map((anilist) => {
      const malId = anilist.idMal?.toString() || '';
      const shikimori = shikimoriData.find(
        (data) => data.malId?.toString() === malId,
      );
      return {
        ...anilist,
        shikimori: (shikimori as any) || null,
      } as AnilistWithRelations;
    });

    const basicAnilist = data.map((anilist) =>
      this.helper.convertAnilistToBasic(anilist),
    );

    return { data: basicAnilist, pageInfo: response.pageInfo };
  }

  async adjustAnilist(anilist: Anilist): Promise<AnilistWithRelations> {
    const shikimori = await this.shikimoriService.getShikimori(
      anilist.idMal?.toString() || '',
    );
    
    const recommendations = await this.getRecommendations(anilist.id, 10, 1);

    const chronology = await this.getChronology(anilist.id, 4, 1);

    return {
      ...anilist,
      recommendations: recommendations.data || [],
      chronology: chronology.data || [],
      shikimori: shikimori || [],
    } as unknown as AnilistWithRelations;
  }

  async getChronology(id: number, perPage: number, page: number): Promise<ApiResponse<BasicAnilistSmall[]>> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
    }) as AnilistWithRelations

    const chronologyRaw = await this.shikimoriService.getChronology(String(existingAnilist.idMal)) as BasicIdShik[] || []
    const chronologyIds = chronologyRaw.map(c => Number(c.malId)) as number[] || []
    const chronology = await this.getAnilists(
      new FilterDto({ idMalIn: chronologyIds, perPage, page })
    );

    const basicChronology = chronology.data.map((anilist) =>
      this.helper.convertBasicToBasicSmall(anilist),
    );

    return {
      ...chronology,
      data: basicChronology,
    };
  }

  async getRecommendations(id: number, perPage: number, page: number): Promise<ApiResponse<BasicAnilistSmall[]>> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
    }) as AnilistWithRelations

    const shikimori = await this.shikimoriService.getShikimori(
      existingAnilist.idMal?.toString() || '',
    )

    const recommendationsRaw = (existingAnilist.recommendations && (existingAnilist.recommendations as any).edges)
      ? ((existingAnilist.recommendations as any).edges.map((edge: any) => edge.node.mediaRecommendation) as BasicIdAni[])
      : []
    const recommendationIds = recommendationsRaw.map(r => Number(r.idMal)) as number[] || []
    const recommendations = await this.getAnilists(
      new FilterDto({ idMalIn: recommendationIds, perPage, page })
    );

    const basicRecommendations = recommendations.data.map((anilist) =>
      this.helper.convertBasicToBasicSmall(anilist),
    );

    return {
      ...recommendations,
      data: basicRecommendations,
    };
  }

  async saveAnilist(data: AnilistResponse): Promise<Anilist> {
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    const anilist = data.Page.media[0];

    const moreInfo = await this.fetchMoreInfo(anilist.idMal || 0);

    anilist.moreInfo = moreInfo.data.moreinfo || '';

    await this.prisma.lastUpdated.create({
      data: {
        entityId: anilist.id.toString(),
        type: UpdateType.ANILIST,
      },
    });

    return await this.prisma.anilist.upsert({
      where: { id: anilist.id },
      create: this.helper.getDataForPrisma(anilist),
      update: this.helper.getDataForPrisma(anilist),
    });
  }

  async update(id: number): Promise<void> {
    const data = await this.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    await this.saveAnilist(data);
  }

  async fetchAnilistFromGraphQL(
    id: number,
    isMal: boolean = false,
  ): Promise<AnilistResponse> {
    const queryBuilder = new AnilistQueryBuilder();

    if (isMal) {
      queryBuilder.setIdMal(id).setPerPage(1);
    } else {
      queryBuilder.setId(id).setPerPage(1);
    }

    const query = AnilistQL.getQuery();

    return await this.customHttpService.getGraphQL<AnilistResponse>(
      UrlConfig.ANILIST_GRAPHQL,
      query,
      queryBuilder.build(),
    );
  }

  async fetchMoreInfo(id: number): Promise<MoreInfoResponse> {
    try {
      const url = `${UrlConfig.JIKAN}anime/${id}/moreinfo`;
      return this.customHttpService.getResponse(url);
    } catch (error) {
      return { data: {} };
    }
  }

  async getAnilistByFilter(
    filter: FilterDto,
  ): Promise<ApiResponse<Anilist[]>> {

    const conditions = [
      // Basic filters (only include if defined)
      filter.id !== undefined ? { id: filter.id } : {},
      filter.idMal !== undefined ? { idMal: filter.idMal } : {},
      filter.type ? { type: filter.type } : {},
      filter.format ? { format: filter.format } : {},
      filter.status ? { status: filter.status } : {},
      filter.season ? { season: filter.season } : {},
      filter.isAdult !== undefined ? { isAdult: filter.isAdult } : {},
      filter.isLicensed !== undefined ? { isLicensed: filter.isLicensed } : {},
      filter.countryOfOrigin ? { countryOfOrigin: filter.countryOfOrigin } : {},

      // Array contains filters
      filter.genreIn ? { genres: { hasEvery: filter.genreIn } } : {},
      filter.genreNotIn ? { genres: { hasNone: filter.genreNotIn } } : {},
      filter.idIn ? { id: { in: filter.idIn } } : {},
      filter.idNotIn ? { id: { notIn: filter.idNotIn } } : {},
      filter.idMalIn ? { idMal: { in: filter.idMalIn } } : {},
      filter.idMalNotIn ? { idMal: { notIn: filter.idMalNotIn } } : {},

      // Numeric comparisons
      filter.durationGreater != null
      ? { duration: { gt: filter.durationGreater } }
      : {},
      filter.durationLesser != null
      ? { duration: { lt: filter.durationLesser } }
      : {},
      filter.episodesGreater != null
      ? { episodes: { gt: filter.episodesGreater } }
      : {},
      filter.episodesLesser != null
      ? { episodes: { lt: filter.episodesLesser } }
      : {},
      filter.popularityGreater != null
      ? { popularity: { gt: filter.popularityGreater } }
      : {},
      filter.popularityLesser != null
      ? { popularity: { lt: filter.popularityLesser } }
      : {},
      filter.averageScoreGreater != null
      ? { averageScore: { gt: filter.averageScoreGreater } }
      : {},
      filter.averageScoreLesser != null
      ? { averageScore: { lt: filter.averageScoreLesser } }
      : {},

      // Format filters
      filter.formatIn ? { format: { in: filter.formatIn } } : {},
      filter.formatNotIn ? { format: { notIn: filter.formatNotIn } } : {},
      filter.formatNot ? { format: { not: filter.formatNot } } : {},

      // Status filters
      filter.statusIn ? { status: { in: filter.statusIn } } : {},
      filter.statusNotIn ? { status: { notIn: filter.statusNotIn } } : {},
      filter.statusNot ? { status: { not: filter.statusNot } } : {},

      // Search filter
      filter.query
      ? {
        OR: [
          {
          title: {
            romaji: {
            contains: filter.query,
            mode: 'insensitive',
            },
          },
          },
          {
          title: {
            english: {
            contains: filter.query,
            mode: 'insensitive',
            },
          },
          },
          {
          title: {
            native: {
            contains: filter.query,
            mode: 'insensitive',
            },
          },
          },
          {
          synonyms: {
            hasSome: [filter.query],
          },
          },
        ],
        } as any
      : {},

      // Date filters using JSON paths and string format "YYYY.M.D"
      filter.startDateGreater
      ? (() => {
        const [year, month, day] = filter.startDateGreater.split('.').map(Number);
        return {
          OR: [
          { startDate: { path: '$.year', gt: year } },
          {
            AND: [
            { startDate: { path: '$.year', equals: year } },
            { startDate: { path: '$.month', gt: month } },
            ],
          },
          {
            AND: [
            { startDate: { path: '$.year', equals: year } },
            { startDate: { path: '$.month', equals: month } },
            { startDate: { path: '$.day', gt: day } },
            ],
          },
          ],
        };
        })()
      : {},
      filter.endDateGreater
      ? (() => {
        const [year, month, day] = filter.endDateGreater.split('.').map(Number);
        return {
          OR: [
          { endDate: { path: '$.year', gt: year } },
          {
            AND: [
            { endDate: { path: '$.year', equals: year } },
            { endDate: { path: '$.month', gt: month } },
            ],
          },
          {
            AND: [
            { endDate: { path: '$.year', equals: year } },
            { endDate: { path: '$.month', equals: month } },
            { endDate: { path: '$.day', gt: day } },
            ],
          },
          ],
        };
        })()
      : {},
    ].filter((condition) => Object.keys(condition).length > 0);

    const whereCondition = { AND: conditions };

    const perPage = filter.perPage || 25;
    const currentPage = filter.page || 1;
    const skip = (currentPage - 1) * perPage;

    let isRecentSort = false
    let recentIds: number[] = [];

    const orderBy = await (async () => {
      const sortFields = filter.sort?.map(async (sortField) => {
        const parts = sortField.split('_')
        let direction = 'asc'

        const lastPart = parts[parts.length - 1].toLowerCase()
        if (lastPart === 'asc' || lastPart === 'desc') {
          direction = lastPart
          parts.pop()
        }

        const field = parts.join('_')

        if (field === 'recent') {
          isRecentSort = true
          recentIds = await this.getRecentIds()
          return { id: direction }
        }

        if (field === 'start_date') {
          return [
            { startDate: { year: direction } },
            { startDate: { month: direction } },
            { startDate: { day: direction } }
          ]
        }

        if (field === 'end_date') {
          return [
            { endDate: { year: direction } },
            { endDate: { month: direction } },
            { endDate: { day: direction } }
          ]
        }

        if (parts.length > 1) {
          let nested: any = { [parts.pop()!]: direction }
          while (parts.length) {
            nested = { [parts.pop()!]: nested }
          }
          return nested
        }

        return { [parts[0]]: direction };
      }) || [{ id: 'desc' }]

      const resolvedSorts = await Promise.all(sortFields)
      return resolvedSorts.flat()
    })();

    if (isRecentSort && recentIds.length > 0) {
      conditions.push({ id: { in: recentIds } })
    }

    const [data, total] = await Promise.all([
      this.prisma.anilist.findMany({
        where: whereCondition,
        include: {
          title: {
            omit: {
              id: true,
            }
          },
          coverImage: {
            omit: {
              id: true,
            }
          },
          startDate: {
            omit: {
              id: true,
            }
          },
          endDate: {
            omit: {
              id: true,
            }
          },
        },
        take: perPage,
        skip,
        orderBy,
      }),
      this.prisma.anilist.count({
        where: whereCondition,
      }),
    ]);

    const sortedData = isRecentSort ? await this.getRecentData(data, recentIds) : data

    const lastPage = Math.ceil(total / perPage)
    const pageInfo = {
      total,
      perPage,
      currentPage,
      lastPage,
      hasNextPage: currentPage < lastPage,
    }

    return { data: sortedData, pageInfo };
  }

  private async getRecentIds(): Promise<number[]> {
    const recentUpdates = await this.prisma.lastUpdated.findMany({
      where: {
        type: UpdateType.ANILIST
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return recentUpdates.map(update => parseInt(update.entityId))
  }

  private async getRecentData(data: any[], recentIds: number[]) {
    const idPositions = new Map(recentIds.map((id, index) => [id, index]))

    return data.sort((a, b) => {
      const posA = idPositions.get(a.id) ?? Infinity
      const posB = idPositions.get(b.id) ?? Infinity
      return posA - posB
    })
  }
}
