import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZoroService } from '../service/zoro.service'

@Controller('zoro')
export class ZoroController {
  constructor(private readonly service: ZoroService) {}

  @Get('info/:id')
  async getZoro(@Param('id') id: string) {
    return this.service.getZoro(id);
  }

  @Get('anilist/:id')
  async getZoroByAnilist(@Param('id') id: number) {
    return this.service.getZoroByAnilist(Number(id));
  }

  @Get('watch/:id')
  async getZoroWatch(@Param('id') id: string, @Query('dub') dub: boolean = false) {
    return this.service.getSources(id, dub);
  }
}
