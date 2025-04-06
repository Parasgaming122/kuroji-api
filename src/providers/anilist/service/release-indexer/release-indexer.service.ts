import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Ids } from '@prisma/client';
import { CustomHttpService } from '../../../../http/http.service';
import { PrismaService } from '../../../../prisma.service';
import { AtomicInteger } from '../../../../shared/AtomicInteger';
import { AnilistService } from '../anilist.service';

@Injectable()
export class ReleaseIndexerService {
  private isRunning: boolean = false;
  private scheduledUpdatesEnabled: boolean = true;
  private lastProcessedIndex: AtomicInteger = new AtomicInteger(0);
  private allIds: number[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly service: AnilistService,
    private readonly httpService: CustomHttpService,
  ) {}

  public async index(resume: boolean, delay: number) {
    this.isRunning = true;

    if (!resume) {
      this.lastProcessedIndex.set(0);
    }

    if (!this.allIds.length) {
      this.allIds = (await this.getIds()).map((id) => id.id);
    }

    for (let i = this.lastProcessedIndex.get(); i < this.allIds.length; i++) {
      if (!this.isRunning) {
        this.lastProcessedIndex.set(i);
        return;
      }

      let id: number = this.allIds[i];

      try {
        console.log('Fetching release: ' + id);

        if (
          !(await this.prisma.releaseIndex.findUnique({
            where: { id: id.toString() },
          }))
        ) {
          continue;
        }

        await this.service.getAnilist(id, true);

        await this.prisma.anilistIndex.create({
          data: {
            id: id.toString(),
          },
        });
        await this.sleep(delay);
      } catch (e) {
        console.error('Error processing release:', e);
      }
    }
  }

  public sleep(delay: number) {
    return new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }

  public stop(): void {
    this.isRunning = false;
  }

  public async resume(delay: number): Promise<void> {
    if (!this.isRunning) {
      await this.index(true, delay);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  public async updateIndex(): Promise<void> {
    if (!this.scheduledUpdatesEnabled || this.isRunning) {
      console.log('Scheduled updates are disabled. Skipping update.');
      return;
    }

    console.log('Scheduled index update started...');

    let ids: number[] = (await this.getIds()).map((id) => id.id);
    ids = ids.sort((a, b) => b - a);

    for (let id in ids) {
      if (
        !(await this.prisma.releaseIndex.findUnique({
          where: { id: id.toString() },
        }))
      ) {
        try {
          console.log('Indexing new release: ' + id);
          await this.service.getAnilist(parseInt(id), true);

          await this.prisma.releaseIndex.create({
            data: {
              id: id,
            },
          });
          await this.sleep(10);
        } catch (e) {
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

  public async getIds(): Promise<Ids[]> {
    return await this.httpService.getResponse(
      'https://raw.githubusercontent.com/purarue/mal-id-cache/master/cache/anime_cache.json',
    );
  }
}
