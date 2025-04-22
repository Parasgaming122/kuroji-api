import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomHttpService } from '../../../../http/http.service';
import { PrismaService } from '../../../../prisma.service';
import { AtomicInteger } from '../../../../shared/AtomicInteger';
import { AnilistService } from '../anilist.service';
import { get } from 'http'

export interface Ids {
  sfw: number[];
  nsfw: number[];
}

@Injectable()
export class AnilistIndexerService {
  private isRunning: boolean = false;
  private scheduledUpdatesEnabled: boolean = false;
  private allIds: number[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly service: AnilistService,
    private readonly httpService: CustomHttpService,
  ) {}

  public async index(delay: number) {
    if (this.isRunning) {
      console.log('Already running, skip this round.')
      return
    }

    this.isRunning = true

    this.allIds = (await this.getIds()).sort(() => Math.random() - 0.5)

    for (let id of this.allIds) {
      if (!this.isRunning) {
        console.log('Indexing manually stopped 🚫')
        this.isRunning = false
        return
      }

      const existing = await this.prisma.releaseIndex.findUnique({
        where: { id: id.toString() },
      })

      if (existing) continue

      try {
        console.log('Indexing new release: ' + id)
        await this.safeGetAnilist(id);

        await this.prisma.releaseIndex.create({
          data: {
            id: id.toString(),
          },
        });

        await this.sleep(this.getRandomInt(delay, delay + 25))
      } catch (e: any) {
        console.error('Failed index update:', e)
      }
    }

    this.isRunning = false
    console.log('Indexing complete, shutting it down 🛑')
  }

  public stop(): void {
    this.isRunning = false
  }

  public async sleep(delay: number): Promise<void> {
    console.log(`Sleeping for ${delay} seconds...`);
    return new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async updateIndex(): Promise<void> {
    if (!this.scheduledUpdatesEnabled || this.isRunning) {
      console.log('Scheduled updates are disabled. Skipping update.');
      return;
    }

    console.log('Scheduled index update started...');

    let ids: number[] = await this.getIds();
    ids = ids.sort((a, b) => b - a);

    for (let id in ids) {
      if (
        !(await this.prisma.releaseIndex.findUnique({
          where: { id: id.toString() },
        }))
      ) {
        try {
          console.log('Indexing new release: ' + id);
          await this.safeGetAnilist(+id);

          await this.prisma.releaseIndex.create({
            data: {
              id: id,
            },
          });
          await this.sleep(this.getRandomInt(10, 10 + 25));
        } catch (e: any) {
          console.error('Failed scheduled index update:', e);
        }
      }
    }
  }

  public disableScheduledUpdates() {
    this.scheduledUpdatesEnabled = false;
    console.log('Scheduled updates have disabled.');
  }

  public enableScheduledUpdates() {
    this.scheduledUpdatesEnabled = true;
    console.log('Scheduled updates have enabled.');
  }

  public async getIds(): Promise<number[]> {
    const ids = await this.httpService.getResponse(
      'https://raw.githubusercontent.com/purarue/mal-id-cache/master/cache/anime_cache.json',
    ) as Ids;

    return [...ids.sfw, ...ids.nsfw];
  }

  private async safeGetAnilist(id: number, retries = 3): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.service.getAnilist(id, true)
        return
      } catch (e: any) {
        if (e.response?.status === 429) {
          const retryAfter = e.response.headers['retry-after']
            ? parseInt(e.response.headers['retry-after'], 10)
            : this.getRandomInt(30, 60)

          console.warn(`⚠️ 429 hit - Attempt ${attempt}/${retries}. Sleeping ${retryAfter}s`)
          await this.sleep(retryAfter)
        } else {
          throw e
        }
      }
    }

    throw new Error(`Failed to fetch Anilist after ${retries} attempts for ID: ${id}`)
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}