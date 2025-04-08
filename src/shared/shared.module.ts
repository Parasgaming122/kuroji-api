import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from '../http/http.service';
import { PrismaService } from '../prisma.service';
import { AnilistService } from '../providers/anilist/service/anilist.service';
import { AnilistHelper } from '../providers/anilist/utils/anilist-helper';
import { AnimekaiService } from '../providers/animekai/service/animekai.service';
import { AnimeKaiHelper } from '../providers/animekai/utils/animekai-helper';
import { AnimepaheService } from '../providers/animepahe/service/animepahe.service';
import { AnimePaheHelper } from '../providers/animepahe/utils/animepahe-helper';
import { ShikimoriService } from '../providers/shikimori/service/shikimori.service';
import { ShikimoriHelper } from '../providers/shikimori/utils/shikimori-helper';

@Module({
  imports: [HttpModule],
  providers: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
    AnimekaiService,
    AnimeKaiHelper,
    AnimepaheService,
    AnimePaheHelper,
  ],
  exports: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
    AnimekaiService,
    AnimeKaiHelper,
    AnimepaheService,
    AnimePaheHelper,
  ],
})
export class SharedModule {}
