import { Injectable, NotFoundException } from '@nestjs/common';

import { BasicIdShik, Shikimori } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

import { UpdateType } from '../../../shared/UpdateType';

import { Screenshot } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { GraphQL } from '../graphql/shikimori.graphql';
import { ShikimoriHelper } from '../utils/shikimori-helper';

export interface ShikimoriResponse {
  animes: Shikimori[];
}

@Injectable()
export class ShikimoriService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: ShikimoriHelper,
  ) {}

  async getShikimori(id: string): Promise<Shikimori> {
    const existingShikimori = await this.prisma.shikimori.findUnique({
      where: { id },
      omit: { chronology: true }
    }) as Shikimori;
    if (existingShikimori) {
      return this.adjustShikimori(existingShikimori);
    }

    const shikimoriList = (await this.fetchShikimoriFromGraphQL(id, 1, 1)) as {
      animes: Shikimori[];
    };
    if (!shikimoriList.animes.length) {
      throw new NotFoundException(`No Shikimori data found for ID: ${id}`);
    }

    const anime = shikimoriList.animes[0];

    if (!anime) {
      throw new NotFoundException(`Shikimori not found for ID: ${id}`);
    }

    await this.saveShikimori(anime);

    const newShikimori = await this.prisma.shikimori.findUnique({
      where: { id },
      omit: { chronology: true }
    }) as Shikimori;

    return this.adjustShikimori(newShikimori);
  }

  async getChronology(id: string): Promise<BasicIdShik[]> {
    const shikimori = await this.prisma.shikimori.findUnique({
      where: { id },
    });

    if (!shikimori) {
      throw new NotFoundException(`Shikimori not found for ID: ${id}`);
    }

    return (shikimori.chronology as BasicIdShik[]) || [];
  }

  async saveMultipleShikimori(ids: string): Promise<Shikimori[]> {
    const idList = ids
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '');

    const existingShikimoriList = await this.prisma.shikimori.findMany({
      where: { id: { in: idList } },
      omit: { chronology: true }
    }) as Shikimori[];

    const existingIds = existingShikimoriList.map((shikimori) => shikimori.id);
    const idsToFetch = idList.filter((id) => !existingIds.includes(id));

    const shikimoriList: Shikimori[] = [...existingShikimoriList];

    if (idsToFetch.length) {
      const fetchedShikimoriList = (await this.fetchShikimoriFromGraphQL(
        idsToFetch.join(','),
        1,
        idsToFetch.length,
      )) as ShikimoriResponse;

      if (!fetchedShikimoriList.animes.length) {
        return [];
      }

      const newShikimoriList: Shikimori[] = fetchedShikimoriList.animes.filter(
        (shikimori) => !existingIds.includes(shikimori.id),
      );

      if (newShikimoriList.length) {
        await this.saveShikimoris(newShikimoriList);
      }

      shikimoriList.push(
        ...fetchedShikimoriList.animes.map(this.adjustShikimori),
      );
    }

    return shikimoriList;
  }

  async saveShikimori(anime: Shikimori): Promise<Shikimori> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: anime.id,
        type: UpdateType.SHIKIMORI,
      },
    });

    const savedShikimori = await this.prisma.shikimori.upsert({
      where: { id: anime.id },
      update: this.helper.getDataForPrisma(anime),
      create: this.helper.getDataForPrisma(anime),
    });

    return savedShikimori;
  }

  async saveShikimoris(shikimoris: Shikimori[]): Promise<void> {
    const lastUpdatedData = shikimoris.map((shikimori) => ({
      entityId: shikimori.id,
      externalId: Number(shikimori.malId),
      type: UpdateType.SHIKIMORI,
    }));

    await this.prisma.lastUpdated.createMany({ data: lastUpdatedData });

    for (const anime of shikimoris) {
      await this.saveShikimori(anime);
    }
  }

  async update(id: string): Promise<Shikimori> {
    const shikimoriList = (await this.fetchShikimoriFromGraphQL(
      id,
      1,
      1,
    )) as ShikimoriResponse;

    if (!shikimoriList.animes.length) {
      throw new NotFoundException(`Shikimori not found for ID: ${id}`);
    }

    const shikimori = shikimoriList[0];
    const existingShikimori = await this.prisma.shikimori.findUnique({
      where: { id },
    });

    if (JSON.stringify(shikimori) === JSON.stringify(existingShikimori)) {
      return shikimori;
    }

    return this.saveShikimori(shikimori);
  }

  async getFranchise(franchise: string): Promise<Shikimori[]> {
    const shikimoris = await this.prisma.shikimori.findMany({
      where: { franchise },
    });
    return shikimoris;
  }

  async getFranchiseIds(franchise: string): Promise<BasicIdShik[]> {
    const shikimoris = await this.getFranchise(franchise);

    const shikimoriBasicId = shikimoris.map((shikimori) => 
      this.helper.shikimoriToBasicId(shikimori)
    );

    return shikimoriBasicId;
  }

  adjustShikimori(shikimori: Shikimori): Shikimori {
    const screenshots = shikimori.screenshots as Screenshot[];

    if (screenshots && screenshots.length > 10) {
      shikimori.screenshots = screenshots.slice(0, 10);
    }

    return shikimori;
  }

  private async fetchShikimoriFromGraphQL(
    id: string,
    page: number,
    perPage: number,
  ): Promise<ShikimoriResponse> {
    const data: { animes: Shikimori[] } =
      await this.customHttpService.getGraphQL(
        UrlConfig.SHIKIMORI_GRAPHQL,
        GraphQL.getShikimoriAnime(id, page, perPage),
      );

    return data as unknown as Promise<ShikimoriResponse>;
  }
}
