import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasicIdShik, BasicIdAni, AnilistTitle, AnilistCharacter } from '@prisma/client'
import { ApiResponse } from '../../../../api/ApiResponse'
import { TMDB } from '../../../../configs/tmdb.config'
import { MediaSort } from '../../graphql/types/MediaEnums'
import { BasicAnilistSmall, BasicAnilist } from '../../model/BasicAnilist'
import { FilterDto } from '../../model/FilterDto'
import { AnilistService } from '../anilist.service'
import { CustomHttpService } from '../../../../http/http.service'
import { PrismaService } from '../../../../prisma.service'
import { ShikimoriService } from '../../../shikimori/service/shikimori.service'
import { TmdbService } from '../../../tmdb/service/tmdb.service'
import { AnilistHelper } from '../../utils/anilist-helper'
import { AnilistWithRelations, FranchiseResponse } from '../../model/AnilistModels'

@Injectable()
export class AnilistAddService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: AnilistHelper,
    @Inject(forwardRef(() => TmdbService))
    private readonly tmdbService: TmdbService,
    @Inject(forwardRef(() => AnilistService))
    private readonly anilist: AnilistService,
    private readonly shikimoriService: ShikimoriService,
    private readonly customHttpService: CustomHttpService,
  ) {}

  async getChronology(id: number, perPage: number, page: number): Promise<ApiResponse<BasicAnilistSmall[]>> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
    }) as AnilistWithRelations

    const chronologyRaw = await this.shikimoriService.getChronology(String(existingAnilist.idMal)) as BasicIdShik[] || []
    const chronologyIds = chronologyRaw.map(c => Number(c.malId)) as number[] || []
    const chronology = await this.anilist.getAnilists(
      new FilterDto({ idMalIn: chronologyIds, perPage, page })
    );

    const basicChronology = chronology.data.map((anilist) =>
      this.helper.convertBasicToBasicSmall(anilist),
    );

    return {
      ...chronology,
      data: basicChronology,
    } as ApiResponse<BasicAnilistSmall[]>;
  }

  async getRecommendations(id: number, perPage: number, page: number): Promise<ApiResponse<BasicAnilistSmall[]>> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
      include: { recommendations: true }
    }) as {
      idMal: number,
      recommendations: BasicIdAni[]
    }

    const shikimori = await this.shikimoriService.getShikimori(
      existingAnilist.idMal?.toString() || '',
    )

    const recommendationIds = existingAnilist.recommendations.map(r => Number(r.idMal)) as number[] || []
    const recommendations = await this.anilist.getAnilists(
      new FilterDto({ idMalIn: recommendationIds, perPage, page, sort: [MediaSort.SCORE_DESC] })
    );

    const basicRecommendations = recommendations.data.map((anilist) =>
      this.helper.convertBasicToBasicSmall(anilist),
    );

    return {
      ...recommendations,
      data: basicRecommendations,
    } as ApiResponse<BasicAnilistSmall[]>;
  }

  async getCharacters(id: number, perPage: number, page: number): Promise<ApiResponse<AnilistCharacter[]>> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
      include: {
        characters: true,
      }
    }) as unknown as AnilistWithRelations;

    const charactersIds = existingAnilist.characters?.map(c => c.id) as number[];

    const [data, total] = await Promise.all([
      this.prisma.anilistCharacterEdge.findMany({
        where: { id: { in: charactersIds } },
        omit: {
          anilistId: true,
          characterId: true,
        },
        include: {
          character: {
            include: {
              image: {
                omit: {
                  id: true,
                  characterId: true
                }
              },
              name: {
                omit: {
                  id: true,
                  characterId: true
                }
              },
            }
          },
          voiceActors: {
            include: {
              image: {
                omit: {
                  id: true,
                  voiceActorId: true
                }
              },
              name: {
                omit: {
                  id: true,
                  voiceActorId: true
                }
              },
            }
          }
        },
        skip: perPage * (page - 1),
        take: perPage
      }),
      this.prisma.anilistCharacter.count(),
    ]);

    const lastPage = Math.ceil(total / perPage)
    const pageInfo = {
      total,
      perPage,
      page,
      lastPage,
      hasNextPage: page < lastPage,
    }

    return { pageInfo, data } as unknown as ApiResponse<AnilistCharacter[]>;
  }

  async getFranchise(franchiseName: string, perPage: number, page: number): Promise<FranchiseResponse<BasicAnilist[]>> {
    const franchiseBasic = await this.shikimoriService.getFranchiseIds(franchiseName);
  
    const franchiseIds = franchiseBasic.map(r => Number(r.malId)) as number[] || []

    const franchises = await this.anilist.getAnilists(
      new FilterDto({ idMalIn: franchiseIds, perPage, page, sort: [MediaSort.START_DATE] })
    );

    const firstFranchise = franchises.data?.[0];
    
    if (!firstFranchise) {
      return {
        pageInfo: franchises.pageInfo,
        franchise: {},
        data: []
      } as unknown as FranchiseResponse<BasicAnilist[]>;
    }
    
    const tmdbFirst = await this.tmdbService.getTmdbByAnilist(firstFranchise.id).catch(() => null);

    const franchise = {
      cover: firstFranchise.shikimori?.poster?.originalUrl,
      banner: TMDB.IMAGE_BASE_ORIGINAL_URL + tmdbFirst?.backdrop_path || firstFranchise.bannerImage,
      title: tmdbFirst?.name || (firstFranchise.title as AnilistTitle)?.romaji,
      franchise: franchiseName,
      description: tmdbFirst?.overview || firstFranchise.description,
    }
  
    return {
      pageInfo: franchises.pageInfo,
      franchise: franchise,
      data: franchises.data
    } as unknown as FranchiseResponse<BasicAnilist[]>;
  }

  async addShikimori(data: AnilistWithRelations[]): Promise<AnilistWithRelations[]> {
    const malIds = data
      .map((anilist) => anilist.idMal?.toString() || '')
      .join(',')
    const shikimoriData =
      await this.shikimoriService.saveMultipleShikimori(malIds);

    return data.map((anilist) => {
      const malId = anilist.idMal?.toString() || ''
      const shikimori = shikimoriData.find(
        (data) => data.malId?.toString() === malId,
      )
      return {
        ...anilist,
        shikimori: (shikimori as any) || null,
      } as AnilistWithRelations
    });
  }
}
