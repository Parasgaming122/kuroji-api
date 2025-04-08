import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module'
import { AnimekaiController } from '../controller/animekai.controller'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [AnimekaiController],
})
export class AnimekaiModule {}
