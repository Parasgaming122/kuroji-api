import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { ZoroService } from '../service/zoro.service';
import { CustomHttpService } from 'src/http/http.service'
import { ZoroHelper } from '../utils/zoro-helper'
import { HttpModule, HttpService } from '@nestjs/axios'
import { ZoroController } from '../controller/zoro.controller'
import { AnilistService } from 'src/providers/anilist/service/anilist.service'
import { AnilistHelper } from 'src/providers/anilist/utils/anilist-helper'
import { ShikimoriService } from 'src/providers/shikimori/service/shikimori.service'
import { ShikimoriHelper } from 'src/providers/shikimori/utils/shikimori-helper'

@Module({
  imports: [HttpModule],
  controllers: [ZoroController],
  providers: [ZoroService, PrismaService, AnilistService, ShikimoriService, ShikimoriHelper, CustomHttpService, ZoroHelper, AnilistHelper],
})
export class ZoroModule {}
