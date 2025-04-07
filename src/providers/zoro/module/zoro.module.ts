import { Module } from '@nestjs/common';
import { ZoroService } from '../service/zoro.service';
import { ZoroHelper } from '../utils/zoro-helper'
import { HttpModule } from '@nestjs/axios'
import { ZoroController } from '../controller/zoro.controller'
import { SharedModule } from '../../../shared/shared.module'

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [ZoroController],
  providers: [ZoroService, ZoroHelper],
})
export class ZoroModule {}
