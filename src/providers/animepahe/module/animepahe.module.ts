import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { AnimepaheController } from '../controller/animepahe.controller'
import { SharedModule } from '../../../shared/shared.module'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [AnimepaheController],
})
export class AnimepaheModule {}
