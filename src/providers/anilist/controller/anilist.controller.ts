import { Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { AnilistService } from '../service/anilist.service';
import { AnilistIndexerService } from '../service/anilist-indexer/anilist-indexer.service'
import { StreamService } from '../../stream/service/stream.service'
import { Provider } from '../../stream/model/Provider'
import { FilterDto } from '../model/FilterDto'
import { AnilistAddService } from '../service/helper/anilist.add.service'
import { AnilistScheduleService } from '../service/helper/anilist.schedule.service'
import Dimens from '../../../configs/Dimens'

@Controller('anime')
export class AnilistController {
  constructor(
    private readonly service: AnilistService, 
    private readonly add: AnilistAddService,
    private readonly schedule: AnilistScheduleService,
    private readonly streamService: StreamService, 
    private readonly indexer: AnilistIndexerService
  ) {}

  @Get('info/:id')
  async getAnilist(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAnilist(id);
  }

  @Get('info/:id/recommendations')
  async getRecommendations(
    @Param('id', ParseIntPipe) id: number, 
    @Query('perPage') perPage: number = Dimens.PER_PAGE, 
    @Query('page') page: number = 1
  ) {
    return this.add.getRecommendations(id, perPage, page);
  }

  @Get('info/:id/chronology')
  async getChronology(
    @Param('id', ParseIntPipe) id: number,
    @Query('perPage') perPage: number = Dimens.PER_PAGE,
    @Query('page') page: number = 1
  ) {
    return this.add.getChronology(id, perPage, page)
  }

  @Get('info/:id/episodes')
  async getEpisodes(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getEpisodes(id);
  }

  @Get('info/:id/providers/:number')
  async getProvidersSingle(
    @Param('id', ParseIntPipe) id: number, 
    @Param('number', ParseIntPipe) number: number
  ) {
    return this.streamService.getProvidersSingle(id, number);
  }

  @Get('info/:id/providers')
  async getProvidersMultiple(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getProvidersMultiple(id)
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

  @Get('filter')
  async filterAnilist(@Query() filter: FilterDto) {
    return this.service.getAnilists(filter);
  }

  @Get('search/:q')
  async searchAnilist(@Param('q') q: string) {
    return this.service.searchAnilist(q);
  }

  @Get('schedule')
  async getSchedule() {
    return this.schedule.getSchedule();
  }

  @Get('franchise/:franchise')
  async getFranchise(
    @Param('franchise') franchise: string,
    @Query('perPage') perPage: number = Dimens.PER_PAGE,
    @Query('page') page: number = 1
  ) {
    return this.add.getFranchise(franchise, perPage, page);
  }

  @Put('index')
  index(@Query('delay') delay: number = 10) {
    this.indexer.index(delay)
      .catch((err) => console.error('Indexer failed:', err)); // just in case it blows up

    return {
      status: 'Indexing started',
    };
  }

  @Put('index/stop')
  async stopIndex() {
    this.indexer.stop();
    return {
      status: 'Indexing stopped',
    };
  }

  @Put('index/sleep/:sleep')
  sleep(@Param('sleep', ParseIntPipe) sleep: number) {
    this.indexer.sleep(sleep)
      .catch((err) => console.error('Sleeping failed:', err))

    return {
      status: `Sleeping for ${sleep}s`,
    }
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