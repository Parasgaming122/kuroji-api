import { Controller, Get, Param } from '@nestjs/common';
import { AnimepaheService } from '../service/animepahe.service'

@Controller('animepahe')
export class AnimepaheController {
  constructor(private readonly service: AnimepaheService) {}

  @Get(':id')
  async getAnimepaheByAnilist(@Param('id') id: number) {
    return this.service.getAnimepaheByAnilist(Number(id));
  }
}
