import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';
import { AnilistController } from '../controller/anilist.controller';
import { SharedModule } from '../../../shared/shared.module'

@Module({
  imports: [HttpModule, ShikimoriHelperModule, SharedModule],
  controllers: [AnilistController],
})
export class AnilistModule {}
