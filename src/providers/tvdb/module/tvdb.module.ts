import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module'
import { TvdbController } from '../controller/tvdb.controller'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [TvdbController],
})
export class TvdbModule {}
