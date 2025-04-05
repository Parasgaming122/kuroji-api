import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AnilistService } from '../service/anilist.service';
import AnilistQueryBuilder from '../graphql/query/AnilistQueryBuilder';
import { MediaSort } from '../graphql/types/MediaEnums';

@Controller('anilist')
export class AnilistController {
  constructor(private readonly service: AnilistService) {}

  @Get('info/:id')
  async getAnilist(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAnilist(id);
  }

  @Get('search')
  async searchAnilist(@Query() query: any) {
    const builder = new AnilistQueryBuilder();
    return this.service.getAnilists(builder.getByQuery(query));
  }
}