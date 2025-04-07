import { Module } from '@nestjs/common';
import { CustomHttpService } from '../http/http.service'
import { PrismaService } from '../prisma.service'
import { AnilistService } from '../providers/anilist/service/anilist.service'
import { AnilistHelper } from '../providers/anilist/utils/anilist-helper'
import { ShikimoriService } from '../providers/shikimori/service/shikimori.service'
import { ShikimoriHelper } from '../providers/shikimori/utils/shikimori-helper'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
  ],
  exports: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
  ],
})
export class SharedModule {}