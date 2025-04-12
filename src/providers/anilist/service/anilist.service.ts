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
import { BasicAnilist } from '../model/BasicAnilist';
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
  chronology?: BasicRelease[];
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
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id: anilist.id },
    }) as AnilistWithRelations

    const shikimori = await this.shikimoriService.getShikimori(
      existingAnilist.idMal?.toString() || '',
    );

    const recommendationsRaw = (existingAnilist.recommendations && (existingAnilist.recommendations as any).edges)
      ? ((existingAnilist.recommendations as any).edges.map((edge: any) => edge.node.mediaRecommendation) as BasicIdAni[])
      : [];
    const chronologyRaw = await this.shikimoriService.getChronology(String(existingAnilist.idMal)) as BasicIdShik[] || [];

    const recommendationIds = recommendationsRaw.map(r => Number(r.idMal)) as number[] || [];
    const chronologyIds = chronologyRaw.map(c => Number(c.malId)) as number[] || [];
    
    const recommendations = await this.getAnilists(
      new FilterDto({idMalIn: recommendationIds, perPage: 10})
    );

    const chronology = await this.getAnilists(
      new FilterDto({idMalIn: chronologyIds, perPage: 10})
    );

    return {
      ...anilist,
      recommendations: recommendations.data || [],
      chronology: chronology.data || [],
      shikimori: shikimori || [],
    } as unknown as AnilistWithRelations;
  }

  async saveAnilist(data: AnilistResponse): Promise<Anilist> {
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    const anilist = data.Page.media[0];

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
      filter.search
        ? {
          OR: [
            {
              title: {
                romaji: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              title: {
                english: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              title: {
                native: {
                  contains: filter.search,
                  mode: 'insensitive',
                },
              },
            },
            {
              synonyms: {
                hasSome: [filter.search],
              },
            },
          ],
        } as any
        : {},

      // Date filters using JSON paths
      filter.startDateGreater
        ? {
            startDate: {
              path: '$.year',
              gt: parseInt(filter.startDateGreater),
            },
          }
        : {},
      filter.endDateGreater
        ? {
            endDate: {
              path: '$.year',
              gt: parseInt(filter.endDateGreater),
            },
          }
        : {},
    ].filter((condition) => Object.keys(condition).length > 0);

    const whereCondition = { AND: conditions };

    const perPage = filter.perPage || 25;
    const currentPage = filter.page || 1;
    const skip = (currentPage - 1) * perPage;

    // Fetch the matching items along with the total count
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
        orderBy: filter.sort?.map((sortField) => {
          const parts = sortField.split('_');
          let direction = 'asc';
          if (
            parts.length > 1 &&
            (parts[parts.length - 1].toLowerCase() === 'asc' ||
              parts[parts.length - 1].toLowerCase() === 'desc')
          ) {
            direction = parts.pop()!.toLowerCase();
          }
          const field = parts.join('_');

          return { [field]: direction };
        }) || [{ id: 'desc' }],
      }),
      this.prisma.anilist.count({
        where: whereCondition,
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);
    const pageInfo = {
      total,
      perPage,
      currentPage,
      lastPage,
      hasNextPage: currentPage < lastPage,
    };

    return { data, pageInfo };
  }
}
