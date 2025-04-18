import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Anilist } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { UpdateType } from '../../../shared/UpdateType';
import {
  ShikimoriService,
} from '../../shikimori/service/shikimori.service';
import { BasicAnilist } from '../model/BasicAnilist';
import { AnilistHelper } from '../utils/anilist-helper';
import { FilterDto } from '../model/FilterDto'
import { AnilistAddService } from './helper/anilist.add.service'
import { AnilistFilterService } from './helper/anilist.filter.service'
import { AnilistFetchService } from './helper/anilist.fetch.service'
import { MediaType } from '../graphql/types/MediaEnums'
import { AnilistWithRelations, SearcnResponse, FranchiseResponse, AnilistResponse } from '../model/AnilistModels'

@Injectable()
export class AnilistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: AnilistHelper,
    @Inject(forwardRef(() => AnilistAddService))
    private readonly add: AnilistAddService,
    private readonly filter: AnilistFilterService,
    private readonly fetch: AnilistFetchService,
    private readonly shikimoriService: ShikimoriService,
  ) {}

  async getAnilist(
    id: number,
    isMal: boolean = false,
  ): Promise<AnilistWithRelations> {
    let existingAnilist = await this.prisma.anilist.findUnique(this.helper.getFindUnique(id));

    if (existingAnilist) {
      return await this.adjustAnilist(existingAnilist);
    }

    const data = await this.fetch.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    const type = data.Page.media[0].type as unknown as MediaType;
    if (type == MediaType.MANGA) {
      return Promise.reject(Error('Nuh uh, no mangas here'));
    }

    await this.saveAnilist(data);

    existingAnilist = await this.prisma.anilist.findUnique(this.helper.getFindUnique(id));

    if (!existingAnilist) {
      return Promise.reject(Error('Not found'))
    }
    
    return await this.adjustAnilist(existingAnilist);
  }

  async getAnilists(
    filter: FilterDto
  ): Promise<SearcnResponse<BasicAnilist[]>> {
    const response = await this.filter.getAnilistByFilter(filter);

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

    return { pageInfo: response.pageInfo, data: basicAnilist } as unknown as SearcnResponse<BasicAnilist[]>;
  }

  async searchAnilist(q: string): Promise<SearcnResponse<BasicAnilist[]>> {
    const response = await this.filter.getAnilistByFilter(new FilterDto({ query: q }))

    const malIds = response.data
      .map((anilist) => anilist.idMal?.toString() || '')
      .join(',')
    const shikimoriData =
      await this.shikimoriService.saveMultipleShikimori(malIds)

    const data = response.data.map((anilist) => {
      const malId = anilist.idMal?.toString() || ''
      const shikimori = shikimoriData.find(
        (data) => data.malId?.toString() === malId,
      )
      return {
        ...anilist,
        shikimori: (shikimori as any) || null,
      } as AnilistWithRelations
    })

    const basicAnilist = data.map((anilist) =>
      this.helper.convertAnilistToBasic(anilist),
    )

    const firstBasicFranchise = basicAnilist.find(b =>
      !!b.shikimori?.franchise && b.shikimori.franchise.trim().length > 0
    )

    const franchise = await this.add.getFranchise(firstBasicFranchise?.shikimori?.franchise || '', 3, 1) as unknown as FranchiseResponse<BasicAnilist[]>

    return {
      pageInfo: response.pageInfo,
      franchise: {
        franchise: franchise.franchise || {},
        data: franchise.data || [],
      }, data: basicAnilist
    } as unknown as SearcnResponse<BasicAnilist[]>
  }

  async adjustAnilist(anilist: Anilist): Promise<AnilistWithRelations> {
    const shikimori = await this.shikimoriService.getShikimori(
      anilist.idMal?.toString() || '',
    );
    
    const recommendations = await this.add.getRecommendations(anilist.id, 10, 1);

    const chronology = await this.add.getChronology(anilist.id, 4, 1);

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

    const moreInfo = await this.fetch.fetchMoreInfo(anilist.idMal || 0);

    anilist.moreInfo = moreInfo.data.moreinfo || '';

    await this.prisma.lastUpdated.create({
      data: {
        entityId: anilist.id.toString(),
        externalId: anilist.idMal,
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
    const data = await this.fetch.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    await this.saveAnilist(data);
  }
}