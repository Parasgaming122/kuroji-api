import { Injectable } from '@nestjs/common';
import { EpisodeZoro, Zoro } from '@prisma/client';
import { UrlConfig } from '../../../configs/url.config';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper';

export interface ZoroWithRelations extends Zoro {
  episodes: EpisodeZoro[];
}

@Injectable()
export class ZoroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: CustomHttpService,
    private readonly helper: ZoroHelper,
  ) {}

  async getZoro(id: string): Promise<ZoroWithRelations> {
    const existingZoro = await this.prisma.zoro.findUnique({
      where: { id: id },
      include: {
        episodes: true,
      },
    });

    if (!existingZoro) {
      const zoro = await this.fetchZoro(id);
      return this.prisma.zoro.create({
        data: this.helper.getZoroData(zoro),
        include: {
          episodes: true,
        },
      });
    }
    return existingZoro;
  }

  async fetchZoro(id: string): Promise<ZoroWithRelations> {
    const zoro = await this.http.getResponse(UrlConfig.ZORO + 'info?id=' + id);

    return zoro as Promise<ZoroWithRelations>;
  }
}
