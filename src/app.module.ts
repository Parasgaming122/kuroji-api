import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailerModule } from './mailer/mailer.module';
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
import { ExceptionsModule } from './exception/module/exceptions.module'
import { RedisModule } from '@nestjs-modules/ioredis'

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
    ExceptionsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RedisModule.forRoot({
      options: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
      },
      type: 'single'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
