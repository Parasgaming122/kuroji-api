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
  private scheduledUpdatesEnabled: boolean = true;
  private lastProcessedIndex: AtomicInteger = new AtomicInteger(0);
  private allIds: number[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly service: AnilistService,
    private readonly httpService: CustomHttpService,
  ) {}

  public async index(resume: boolean, delay: number) {
    if (this.isRunning) {
      console.log('Already running, skip this round.');
      return;
    }    

    this.isRunning = true;

    if (!resume) {
      this.lastProcessedIndex.set(0);
    }

    this.allIds = await this.getIds();

    for (let id of this.allIds) {
      if (!this.isRunning) {
        console.log('Indexing manually stopped 🚫');
        return; // dip out the loop
      }

      if (
        !(await this.prisma.releaseIndex.findUnique({
          where: { id: id.toString() },
        }))
      ) {
        try {
          console.log('Indexing new release: ' + id);
          await this.service.getAnilist(id, true);
    
          await this.prisma.releaseIndex.create({
            data: {
              id: id.toString(), // you were also missing toString() here, bruh
            },
          });
    
          await this.sleep(10); // now this gon’ actually wait
        } catch (e) {
          console.error('Failed scheduled index update:', e);
        }
      }
    }
  }

  public async sleep(delay: number): Promise<void> {
    console.log(`Sleeping for ${delay} seconds...`);
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

  public async getIds(): Promise<number[]> {
    const ids = await this.httpService.getResponse(
      'https://raw.githubusercontent.com/purarue/mal-id-cache/master/cache/anime_cache.json',
    ) as Ids;

    return [...ids.sfw, ...ids.nsfw];
  }
}