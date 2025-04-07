import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimekaiService } from '../service/animekai.service'

@Controller('animekai')
export class AnimekaiController {
  constructor(private readonly service: AnimekaiService) {}

  @Get('info/:id')
  async getAnimekaiByAnilist(@Param('id') id: string) {
    return this.service.getAnimekaiByAnilist(Number(id));
  }

  @Get('watch/:id')
  async getSources(@Param('id') id: string, @Query('dub') dub: boolean = false) {
    return this.service.getSources(id, dub);
  }
}
