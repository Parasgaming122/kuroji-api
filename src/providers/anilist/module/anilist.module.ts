import { Module } from '@nestjs/common';
import { AnilistController } from '../controller/anilist.controller';
import { AnilistService } from '../service/anilist.service';

@Module({
  controllers: [AnilistController],
  providers: [AnilistService],
})
export class AnilistModule {}
