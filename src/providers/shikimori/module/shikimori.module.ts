import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../service/shikimori.service';

@Module({
  providers: [ShikimoriService, PrismaService, CustomHttpService, HttpService],
})
export class ShikimoriModule {}
