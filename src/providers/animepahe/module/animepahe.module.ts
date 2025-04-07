import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { AnimepaheController } from '../controller/animepahe.controller'
import { AnimepaheService } from '../service/animepahe.service'
import { AnimePaheHelper } from '../utils/animepahe-helper'
import { SharedModule } from '../../../shared/shared.module'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [AnimepaheController],
  providers: [AnimepaheService, AnimePaheHelper],
})
export class AnimepaheModule {}
