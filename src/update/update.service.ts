import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LastUpdated } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AnilistService } from '../providers/anilist/service/anilist.service';
import { AnimekaiService } from '../providers/animekai/service/animekai.service';
import { AnimepaheService } from '../providers/animepahe/service/animepahe.service';
import { ShikimoriService } from '../providers/shikimori/service/shikimori.service';
import { TmdbService } from '../providers/tmdb/service/tmdb.service';
import { UpdateType } from '../shared/UpdateType'
import { ZoroService } from '../providers/zoro/service/zoro.service'

interface IProvider {
  update: (id: any) => any;
  type: UpdateType;
}

@Injectable()
export class UpdateService {
  constructor(
    private readonly AniService: AnilistService,
    private readonly AniKaiService: AnimekaiService,
    private readonly ZoroService: ZoroService,
    private readonly PaheService: AnimepaheService,
    private readonly ShikService: ShikimoriService,
    private readonly TmdbService: TmdbService,
    private readonly prisma: PrismaService,
  ) {}

  providers: IProvider[] = [
    {
      update: (id: any) => this.AniService.update(Number(id)),
      type: UpdateType.ANILIST,
    },
    {
      update: (id: any) => this.AniKaiService.update(String(id)),
      type: UpdateType.ANIMEKAI,
    },
    {
      update: (id: any) => this.PaheService.update(String(id)),
      type: UpdateType.ANIMEPAHE,
    },
    {
      update: (id: any) => this.ZoroService.update(String(id)),
      type: UpdateType.ANIWATCH,
    },
    {
      update: (id: any) => this.ShikService.update(String(id)),
      type: UpdateType.SHIKIMORI,
    },
    {
      update: (id: any) => this.TmdbService.update(Number(id)),
      type: UpdateType.TMDB,
    },
  ];

  @Cron(CronExpression.EVERY_12_HOURS)
  async update() {
    for (const provider of this.providers) {
      try {
        const lastUpdates: LastUpdated[] =
          await this.prisma.lastUpdated.findMany({
            where: {
              type: provider.type,
            },
          });
        if (!lastUpdates.length) continue;

        for (const lastUpdated of lastUpdates) {
          const now: Date = new Date();
          const lastTime: number = lastUpdated.createdAt.getTime();
          const lastDatePlusMonth = new Date(
            lastUpdated.createdAt.getFullYear(),
            lastUpdated.createdAt.getMonth() + 1,
            lastUpdated.createdAt.getDate(),
          );

          if (lastTime + 12 * 60 * 60 * 1000 < now.getTime()) {
            console.log(
              `Updating ${provider.type} with ID:${lastUpdated.entityId}`,
            );

            provider.update(lastUpdated.entityId);
            await this.sleep(10);
          }

          if (lastDatePlusMonth.getTime() < now.getTime()) {
            await this.prisma.lastUpdated.delete({
              where: lastUpdated,
            });
          }
        }
      } catch (e) {
        console.error(`Error in ${provider.type} provider UpdateService:`, e);
      }
    }
  }

  public async sleep(delay: number): Promise<void> {
    console.log(`Sleeping for ${delay} seconds...`);
    return new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }
}
