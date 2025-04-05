import { Injectable } from '@nestjs/common';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { Anilist, BasicRelease, Screenshot } from '@prisma/client'
import { MediaPage } from '../graphql/types/MediaPage'
import { UrlConfig } from '../../../configs/url.config' // Fixed import path
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder'
import AnilistQL from '../graphql/AnilistQL'
import { UpdateType } from 'src/shared/UpdateType'
import { AnilistHelper } from '../utils/anilist-helper'

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

export interface AnilistWithRelations extends Anilist {
  chronology?: BasicRelease[];
  recommendation?: BasicRelease[];
  screenshots?: Screenshot[];
}

@Injectable()
export class AnilistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: AnilistHelper,
    private readonly shikimoriService: ShikimoriService,
    private readonly customHttpService: CustomHttpService,
  ) {}

  async getAnilist(id: number): Promise<AnilistWithRelations> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id },
      include: {
        tags: true,
        externalLinks: true,
        streamingEpisodes: true,
        BasicIdAni: true
      }
    });

    if (existingAnilist) {
      const shikimori = await this.shikimoriService.getShikimori(existingAnilist.idMal?.toString() || '');
      return {
        ...existingAnilist,
        screenshots: shikimori.screenshots || []
      } as AnilistWithRelations;
    }

    const data = await this.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }

    const anilist = data.Page.media[0];
    const savedAnilist = await this.saveAnilist(anilist);

    // Get screenshots from Shikimori after saving
    const shikimori = await this.shikimoriService.getShikimori(anilist.idMal?.toString() || '');

    return {
      ...savedAnilist,
      screenshots: shikimori.screenshots || []
    } as AnilistWithRelations;
  }

  async saveAnilist(anilist: Anilist): Promise<Anilist> {
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

  async fetchAnilistFromGraphQL(
    id: number
  ): Promise<AnilistResponse> {
    const queryBuilder = new AnilistQueryBuilder();
    queryBuilder.setId(id).setPerPage(1);

    const query = AnilistQL.getQuery();

    return await this.customHttpService.getGraphQL<AnilistResponse>(
      UrlConfig.ANILIST_GRAPHQL,
      query,
      queryBuilder.build()
    );
  }
}