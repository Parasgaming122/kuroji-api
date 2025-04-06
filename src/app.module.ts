import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShikimoriModule } from './providers/shikimori/module/shikimori.module';
import { AnilistModule } from './providers/anilist/module/anilist.module'
import { ZoroModule } from './providers/zoro/module/zoro.module'

@Module({
  imports: [ShikimoriModule, AnilistModule, ZoroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
