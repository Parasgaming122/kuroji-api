import { Injectable, NotFoundException } from '@nestjs/common';

import {
  AiredOn,
  BasicIdShik,
  Poster,
  ReleasedOn,
  Shikimori,
  Video,
} from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

import { UpdateType } from '../../../shared/UpdateType';

import { Screenshot } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { GraphQL } from '../graphql/shikimori.graphql';
import { ShikimoriHelper } from '../utils/shikimori-helper';

export interface ShikimoriWithRelations extends Shikimori {
  airedOn?: AiredOn | null;
  releasedOn?: ReleasedOn | null;
  poster?: Poster | null;
  chronology: BasicIdShik[];
  videos: Video[];
  screenshots: Screenshot[];
}
export interface ShikimoriResponse {
  animes: ShikimoriWithRelations[];
}
@Injectable()
export class ShikimoriService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: ShikimoriHelper,
  ) {}

  async getShikimori(id: string): Promise<ShikimoriWithRelations> {
    const existingShikimori = await this.prisma.shikimori.findUnique({
      where: { id },
      include: {
        chronology: true, // Include the relation field
        screenshots: true,
        airedOn: true,
        releasedOn: true,
        poster: true,
        videos: true,
      },
    });
    if (existingShikimori) {
      return this.adjustShikimori(existingShikimori);
    }

    const shikimoriList = (await this.fetchShikimoriFromGraphQL(id, 1, 1)) as {
      animes: ShikimoriWithRelations[];
    };
    if (!shikimoriList.animes.length) {
      throw new NotFoundException(`No Shikimori data found for ID: ${id}`);
    }

    const animeShik = shikimoriList.animes[0] as Shikimori;
    const anime = shikimoriList.animes[0];
    const savedShikimori = await this.prisma.shikimori.create({
      data: this.helper.getDataForPrisma(anime),
      include: {
        chronology: true, // Include the relation field
        screenshots: true,
        airedOn: true,
        releasedOn: true,
        poster: true,
        videos: true,
      },
    });
    return this.adjustShikimori(savedShikimori);
  }

  async getChronology(id: string): Promise<BasicIdShik[]> {
    const shikimori = await this.prisma.shikimori.findUnique({
      where: { id },
      include: {
        chronology: true, // Include the relation field
        screenshots: true,
        airedOn: true,
        releasedOn: true,
        poster: true,
        videos: true,
      },
    });

    if (!shikimori) {
      throw new NotFoundException(`Shikimori not found for ID: ${id}`);
    }

    if (!shikimori.chronology) {
      const updatedShikimoriList = (await this.fetchShikimoriFromGraphQL(
        id,
        1,
        1,
      )) as ShikimoriResponse;

      if (!updatedShikimoriList.animes.length) {
        throw new NotFoundException(
          `Failed to update Shikimori chronology for ID: ${id}`,
        );
      }

      const updatedShikimori = await this.prisma.shikimori.update({
        where: { id },
        data: this.helper.getDataForPrisma(updatedShikimoriList.animes[0]),
        include: {
          chronology: true, // Include the relation field
          screenshots: true,
          airedOn: true,
          releasedOn: true,
          poster: true,
          videos: true,
        },
      });

      return updatedShikimori.chronology || [];
    }

    return shikimori.chronology || [];
  }

  async saveMultipleShikimori(ids: string): Promise<Shikimori[]> {
    const idList = ids.split(',');

    const existingShikimoriList = await this.prisma.shikimori.findMany({
      where: { id: { in: idList } },
    });

    const existingIds = existingShikimoriList.map((shikimori) => shikimori.id);
    const idsToFetch = idList.filter((id) => !existingIds.includes(id));

    const shikimoriList = [...existingShikimoriList];

    if (idsToFetch.length) {
      const fetchedShikimoriList = (await this.fetchShikimoriFromGraphQL(
        idsToFetch.join(','),
        1,
        idsToFetch.length,
      )) as ShikimoriResponse;

      if (!fetchedShikimoriList.animes.length) {
        throw new NotFoundException(
          'No Shikimori data found for the provided IDs.',
        );
      }

      const newShikimoriList: ShikimoriWithRelations[] =
        fetchedShikimoriList.animes.filter(
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

  async saveShikimori(
    anime: ShikimoriWithRelations,
  ): Promise<ShikimoriWithRelations> {
    await this.prisma.lastUpdated.create({
      data: {
        entityId: anime.id,
        type: UpdateType.SHIKIMORI,
      },
    });

    return await this.prisma.shikimori.upsert({
      where: { id: anime.id },
      update: this.helper.getDataForPrisma(anime),
      include: {
        chronology: true, // Include the relation field
        screenshots: true,
        airedOn: true,
        releasedOn: true,
        poster: true,
        videos: true,
      },
      create: this.helper.getDataForPrisma(anime),
    });
  }

  async saveShikimoris(shikimoris: ShikimoriWithRelations[]): Promise<void> {
    const lastUpdatedData = shikimoris.map((shikimori) => ({
      entityId: shikimori.id,
      type: UpdateType.SHIKIMORI,
    }));

    await this.prisma.lastUpdated.createMany({ data: lastUpdatedData });
    for (const anime of shikimoris) {
      await this.prisma.shikimori.create({
        data: this.helper.getDataForPrisma(anime),
        include: {
          chronology: true, // Include the relation field
          screenshots: true,
          airedOn: true,
          releasedOn: true,
          poster: true,
          videos: true,
        },
      });
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

  adjustShikimori(shikimori: ShikimoriWithRelations): ShikimoriWithRelations {
    if (shikimori.screenshots && shikimori.screenshots.length > 10) {
      shikimori.screenshots = shikimori.screenshots.slice(0, 10);
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
