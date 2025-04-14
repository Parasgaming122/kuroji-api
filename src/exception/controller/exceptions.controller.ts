import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ExceptionsService } from '../service/exceptions.service'

@Controller('exceptions')
export class ExceptionsController {
  constructor(private readonly service: ExceptionsService) {}

  @Get('all')
  async getAll(@Query('perPage') perPage: number = 10, @Query('page') page: number = 1) {
    return this.service.getExceptions(perPage, page);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
