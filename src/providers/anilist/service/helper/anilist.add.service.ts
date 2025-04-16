import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasicIdShik, BasicIdAni } from '@prisma/client'
import { ApiResponse } from '../../../../api/ApiResponse'
import { TMDB } from '../../../../configs/tmdb.config'
import { MediaSort } from '../../graphql/types/MediaEnums'
import { BasicAnilistSmall, BasicAnilist } from '../../model/BasicAnilist'
import { FilterDto } from '../../model/FilterDto'
import { AnilistService, AnilistWithRelations, FranchiseResponse } from '../anilist.service'
import { CustomHttpService } from '../../../../http/http.service'
import { PrismaService } from '../../../../prisma.service'
import { ShikimoriService } from '../../../shikimori/service/shikimori.service'
import { TmdbService } from '../../../tmdb/service/tmdb.service'
import { AnilistHelper } from '../../utils/anilist-helper'

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
    };
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

  async getFranchise(franchiseName: string, perPage: number, page: number): Promise<FranchiseResponse<BasicAnilist[]>> {
    const franchiseBasic = await this.shikimoriService.getFranchiseIds(franchiseName);
  
    const franchiseIds = franchiseBasic.map(r => Number(r.malId)) as number[] || []

    const franchises = await this.anilist.getAnilists(
      new FilterDto({ idMalIn: franchiseIds, perPage, page, sort: [MediaSort.START_DATE_DESC] })
    );

    const firstFranchise = franchises.data?.[0];
    
    if (!firstFranchise) {
      return {
        franchise: {},
        data: [],
        pageInfo: franchises.pageInfo
      } as unknown as FranchiseResponse<BasicAnilist[]>;
    }
    
    const tmdbFirst = await this.tmdbService.getTmdbByAnilist(firstFranchise.id);

    const franchise = {
      cover: firstFranchise.shikimori?.poster?.originalUrl,
      banner: TMDB.IMAGE_BASE_ORIGINAL_URL + tmdbFirst.backdrop_path || firstFranchise.bannerImage,
      title: firstFranchise.title,
      franchise: franchiseName,
      description: firstFranchise.description,
    }
  
    return {
      pageInfo: franchises.pageInfo,
      franchise: franchise,
      data: franchises.data
    } as unknown as FranchiseResponse<BasicAnilist[]>;
  }
}
