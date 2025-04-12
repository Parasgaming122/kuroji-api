import { Injectable } from '@nestjs/common';
import { Anilist } from '@prisma/client'
import { ApiResponse } from '../../../../api/ApiResponse'
import { UpdateType } from '../../../../shared/UpdateType'
import { FilterDto } from '../../model/FilterDto'
import { PrismaService } from '../../../../prisma.service'

@Injectable()
export class AnilistFilterService {
  constructor(private readonly prisma: PrismaService) {}

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