import { Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AnilistService } from '../service/anilist.service';
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder';
import { MediaSort } from '../graphql/types/MediaEnums';
import { AnilistIndexerService } from '../service/anilist-indexer/anilist-indexer.service'

@Controller('anilist')
export class AnilistController {
  constructor(private readonly service: AnilistService, private readonly indexer: AnilistIndexerService) {}

  @Get('info/:id')
  async getAnilist(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAnilist(id);
  }

  @Get('search')
  async searchAnilist(@Query() query: any) {
    const builder = new AnilistQueryBuilder();
    return this.service.getAnilists(builder.getByQuery(query));
  }

  @Put('index')
 index(@Query('resume') resume: boolean = true, @Query('delay') delay: number = 10) {
   this.indexer.index(resume, delay)
     .catch((err) => console.error('Indexer failed:', err)); // just in case it blows up

   return {
     status: 'Indexing started, we vibin’ 🧑‍🍳🔥',
   };
 }

  @Put('index/stop')
  async stopIndex() {
    this.indexer.stop();
    return {
      status: 'Indexing stopped, ig?',
    };
  }

  @Put('index/resume')
  async resumeIndex(@Query('delay') delay: number = 10) {
    this.indexer.resume(delay)
     .catch((err) => console.error('Indexer failed:', err)); // just in case it blows up

   return {
     status: 'Indexing resumed, we vibin’ 🧑‍🍳🔥',
   };
  }

  @Put('index/schedule')
  async scheduleIndex() {
    return this.indexer.enableScheduledUpdates();
  }

  @Put('index/unschedule')
  async unscheduleIndex() {
    return this.indexer.disableScheduledUpdates();
  }
}