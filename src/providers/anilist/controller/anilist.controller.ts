import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AnilistService } from '../service/anilist.service'

@Controller('anilist')
export class AnilistController {
  constructor( private readonly service: AnilistService ) {}

  @Get(':id')
  async getAnilist(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAnilist(id)
  }

  @Get('test')
  async test() {
    return "Test"
  }
}
