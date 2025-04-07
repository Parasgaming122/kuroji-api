import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common';
import { AnimepaheController } from '../controller/animepahe.controller'
import { AnimepaheService } from '../service/animepahe.service'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { AnimePaheHelper } from '../utils/animepahe-helper'
import { ShikimoriService } from '../../shikimori/service/shikimori.service'
import { AnilistHelper } from '../../anilist/utils/anilist-helper'
import { ShikimoriHelper } from '../../shikimori/utils/shikimori-helper'

@Module({
  imports: [HttpModule],
  controllers: [AnimepaheController],
  providers: [AnimepaheService, CustomHttpService, PrismaService, ShikimoriService, ShikimoriHelper, AnimePaheHelper, AnilistHelper, AnilistService],
})
export class AnimepaheModule {}
