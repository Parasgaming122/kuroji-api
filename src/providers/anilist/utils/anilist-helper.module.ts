import { Module } from '@nestjs/common';
import { AnilistHelper } from '../utils/anilist-helper';

@Module({
  providers: [AnilistHelper],
  exports: [AnilistHelper]
})
export class AnilistHelperModule {}