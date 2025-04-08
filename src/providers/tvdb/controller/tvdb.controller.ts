import { Controller, Get, Param } from '@nestjs/common';
import { TvdbService } from '../service/tvdb.service'

@Controller('tvdb')
export class TvdbController {
  constructor(private readonly service: TvdbService) {}

  @Get('info/:id')
  async getTvdbByAnilist(@Param('id') id: number) {
    return this.service.getTvdbByAnilist(Number(id));
  }
}
