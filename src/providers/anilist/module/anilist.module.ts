import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { AnilistController } from '../controller/anilist.controller';
import { AnilistService } from '../service/anilist.service';
import { AnilistIndexerService } from '../service/anilist-indexer/anilist-indexer.service';
import { AnilistHelper } from '../utils/anilist-helper';

@Module({
  imports: [HttpModule, ShikimoriHelperModule],
  controllers: [AnilistController],
  providers: [
    AnilistService,
    ShikimoriService,
    PrismaService,
    CustomHttpService,
    AnilistHelper,
    AnilistIndexerService,
  ],
})
export class AnilistModule {}
