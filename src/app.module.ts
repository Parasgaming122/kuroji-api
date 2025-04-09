import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnilistModule } from './providers/anilist/module/anilist.module';
import { AnimekaiModule } from './providers/animekai/module/animekai.module';
import { AnimepaheModule } from './providers/animepahe/module/animepahe.module';
import { ShikimoriModule } from './providers/shikimori/module/shikimori.module';
import { TmdbModule } from './providers/tmdb/module/tmdb.module';
import { TvdbModule } from './providers/tvdb/module/tvdb.module';
import { ZoroModule } from './providers/zoro/module/zoro.module';
import { AuthModule } from './security/auth/auth.module';
import { UpdateModule } from './update/update.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ShikimoriModule,
    AnilistModule,
    ZoroModule,
    AnimepaheModule,
    AnimekaiModule,
    TmdbModule,
    TvdbModule,
    UpdateModule,
    UserModule,
    AuthModule,
    MailerModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
