import { Controller, Get, Param } from '@nestjs/common';
import { TmdbService } from '../service/tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private readonly service: TmdbService) {}

  @Get('info/:id')
  async getTmdbByAnilist(@Param('id') id: number) {
    return this.service.getTmdbByAnilist(Number(id));
  }

  @Get('info/:id/season')
  async getTmdbSeasonByAnilist(@Param('id') id: number) {
    return this.service.getTmdbSeasonByAnilist(Number(id));
  }
}
