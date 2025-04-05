import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnilistController } from '../controller/anilist.controller';
import { AnilistService } from '../service/anilist.service';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';
import { AnilistHelperModule } from '../utils/anilist-helper.module';

@Module({
  imports: [
    HttpModule,
    ShikimoriHelperModule,
    AnilistHelperModule
  ],
  controllers: [AnilistController],
  providers: [
    AnilistService,
    ShikimoriService,
    PrismaService,
    CustomHttpService,
  ],
})
export class AnilistModule {}
