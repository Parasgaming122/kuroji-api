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
import { TmdbService } from '../providers/tmdb/service/tmdb.service'
import { TmdbHelper } from '../providers/tmdb/utils/tmdb-helper'
import { TvdbService } from '../providers/tvdb/service/tvdb.service'
import { TvdbHelper } from '../providers/tvdb/utils/tvdb-helper'
import { TvdbTokenService } from '../providers/tvdb/service/token/tvdb.token.service'
import { UpdateService } from '../update/update.service'
import { ZoroService } from '../providers/zoro/service/zoro.service'
import { ZoroHelper } from '../providers/zoro/utils/zoro-helper'
import { StreamService } from '../providers/stream/service/stream.service'
import { AnilistIndexerService } from '../providers/anilist/service/anilist-indexer/anilist-indexer.service'
import { AnilistAddService } from '../providers/anilist/service/helper/anilist.add.service'
import { AnilistFilterService } from '../providers/anilist/service/helper/anilist.filter.service'
import { AnilistFetchService } from '../providers/anilist/service/helper/anilist.fetch.service'
import { ExceptionsService } from '../exception/service/exceptions.service'

@Module({
  imports: [HttpModule],
  providers: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    AnilistAddService,
    AnilistFilterService,
    AnilistFetchService,
    AnilistIndexerService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
    AnimekaiService,
    AnimeKaiHelper,
    ZoroService,
    ZoroHelper,
    AnimepaheService,
    AnimePaheHelper,
    TmdbService,
    TmdbHelper,
    TvdbService,
    TvdbTokenService,
    TvdbHelper,
    UpdateService,
    StreamService,
    ExceptionsService
  ],
  exports: [
    PrismaService,
    CustomHttpService,
    AnilistService,
    AnilistAddService,
    AnilistFilterService,
    AnilistFetchService,
    AnilistIndexerService,
    ShikimoriService,
    AnilistHelper,
    ShikimoriHelper,
    AnimekaiService,
    AnimeKaiHelper,
    AnimepaheService,
    AnimePaheHelper,
    TmdbService,
    TmdbHelper,
    TvdbService,
    TvdbTokenService,
    TvdbHelper,
    UpdateService,
    StreamService,
    ExceptionsService
  ],
})
export class SharedModule {}
