import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LastUpdated } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AnilistService } from '../providers/anilist/service/anilist.service';
import { AnimekaiService } from '../providers/animekai/service/animekai.service';
import { AnimepaheService } from '../providers/animepahe/service/animepahe.service';
import { ShikimoriService } from '../providers/shikimori/service/shikimori.service';

interface IProvider {
  save: (data: any) => any;
  fetch: (data: any) => any;
  type:
    | 'ANILIST'
    | 'ANIMEKAI'
    | 'ANIMEPAHE'
    | 'SHIKIMORI'
    | 'TMDB'
    | 'TVDB'
    | 'ZORO';
}

@Injectable()
export class UpdateService {
  constructor(
    private readonly AniService: AnilistService,
    private readonly AniKaiService: AnimekaiService,
    private readonly PaheService: AnimepaheService,
    private readonly ShikService: ShikimoriService,
    private readonly prisma: PrismaService,
  ) {}

  providers: IProvider[] = [
    {
      save: (data: any) => this.AniService.saveAnilist(data),
      fetch: (data: any) => this.AniService.fetchAnilistFromGraphQL(data),
      type: 'ANILIST',
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

            provider.save(await provider.fetch(lastUpdated.entityId));
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
