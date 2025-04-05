import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ShikimoriService } from '../service/shikimori.service';

@Controller('shikimori')
export class ShikimoriController {
  constructor(private readonly service: ShikimoriService) {}

  @Get(':id')
  async getShikimori(@Param('id', ParseIntPipe) id: number) {
    return this.service.getShikimori(id.toString());
  }

  @Get(':id/update')
  async updateShikimori(@Param('id', ParseIntPipe) id: number) {
    return this.service.update(id.toString());
  }
}
