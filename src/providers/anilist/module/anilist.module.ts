import { Module } from '@nestjs/common';
import { AnilistController } from '../controller/anilist.controller';
import { AnilistService } from '../service/anilist.service';
import { HttpService } from '@nestjs/axios';
import { CustomHttpService } from 'src/http/http.service';
import { PrismaService } from 'src/prisma.service';
import { ShikimoriService } from 'src/providers/shikimori/service/shikimori.service';

@Module({
  controllers: [AnilistController],
  providers: [AnilistService, ShikimoriService, PrismaService, CustomHttpService, HttpService],
})
export class AnilistModule {}
