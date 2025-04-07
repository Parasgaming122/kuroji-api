import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module'
import { TmdbController } from '../controller/tmdb.controller'
import { TmdbService } from '../service/tmdb.service'
import { TmdbHelper } from '../utils/tmdb-helper'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [TmdbController],
  providers: [TmdbService, TmdbHelper],
})
export class TmdbModule {}
