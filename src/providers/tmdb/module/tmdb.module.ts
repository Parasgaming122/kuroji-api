import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module'
import { TmdbController } from '../controller/tmdb.controller'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [TmdbController],
})
export class TmdbModule {}
