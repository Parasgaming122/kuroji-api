import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShikimoriController } from '../controller/shikimori.controller';
import { ShikimoriService } from '../service/shikimori.service';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriHelperModule } from './shikimori-helper.module';

@Module({
  imports: [
    HttpModule,
    ShikimoriHelperModule
  ],
  controllers: [ShikimoriController],
  providers: [
    ShikimoriService,
    PrismaService,
    CustomHttpService,
  ],
  exports: [ShikimoriService]
})
export class ShikimoriModule {}
