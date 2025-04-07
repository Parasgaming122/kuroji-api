import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module'
import { AnimekaiController } from '../controller/animekai.controller'
import { AnimekaiService } from '../service/animekai.service'
import { AnimeKaiHelper } from '../utils/animekai-helper'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [AnimekaiController],
  providers: [AnimekaiService, AnimeKaiHelper],
})
export class AnimekaiModule {}
