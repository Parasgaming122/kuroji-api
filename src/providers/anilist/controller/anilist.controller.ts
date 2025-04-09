import { Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AnilistService } from '../service/anilist.service';
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder';
import { MediaSort } from '../graphql/types/MediaEnums';
import { AnilistIndexerService } from '../service/anilist-indexer/anilist-indexer.service'
import { StreamService } from '../../stream/service/stream.service'
import { Provider } from '../../../shared/Provider'
import { filter } from 'rxjs'
import { Filter } from '../model/Filter'
import { FilterDto } from '../model/FilterDto'

@Controller('anilist')
export class AnilistController {
  constructor(private readonly service: AnilistService, private readonly streamService: StreamService, private readonly indexer: AnilistIndexerService) {}

  @Get('info/:id')
  async getAnilist(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAnilist(id);
  }

  @Get('info/:id/episodes')
  async getEpisodes(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getEpisodes(id);
  }

  @Get('info/:id/providers/:number')
  async getProviders(
    @Param('id', ParseIntPipe) id: number, 
    @Param('number', ParseIntPipe) number: number
  ) {
    return this.streamService.getProviders(id, number);
  }

  @Get('info/:id/episodes/:number')
  async getEpisode(
    @Param('id', ParseIntPipe) id: number, 
    @Param('number', ParseIntPipe) number: number
  ) {
    return this.streamService.getEpisode(id, number);
  }

  @Get('watch/:id/episodes/:number')
  async getSources(
    @Param('id', ParseIntPipe) id: number,
    @Param('number', ParseIntPipe) number: number,
    @Query('provider') provider: string = Provider.ANIWATCH,
    @Query('dub') dub: boolean = false
  ) {
    const providerEnum = Provider[provider.toUpperCase() as keyof typeof Provider] || Provider.ANIWATCH;

    return this.streamService.getSources(providerEnum, number, id, dub);
  }

  @Get('search')
  async searchAnilist(@Query() filter: FilterDto) {
    return this.service.getAnilists(filter);
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