import { Injectable } from '@nestjs/common';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { Anilist } from '@prisma/client'
import { MediaPage } from '../graphql/types/MediaPage'
import { UrlConfig } from '../../../configs/url.config' // Fixed import path
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder'
import AnilistQL from '../graphql/AnilistQL'

export interface AnilistWithRelations extends Anilist {
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  // Add other nested fields as needed
}

export interface AnilistResponse {
  Page: {
    media: AnilistWithRelations[];
    pageInfo: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
  };
}

@Injectable()
export class AnilistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shikimoriService: ShikimoriService,
    private readonly customHttpService: CustomHttpService,
  ) {}

  async getAnilist(id: number): Promise<AnilistWithRelations> {
    const existingAnilist = await this.prisma.anilist.findUnique({
      where: { id }
    });

    if (existingAnilist) {
      return existingAnilist as AnilistWithRelations;
    }

    const data = await this.fetchAnilistFromGraphQL(id);
    if (!data.Page?.media || data.Page.media.length === 0) {
      throw new Error('No media found');
    }
    return data.Page.media[0];
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