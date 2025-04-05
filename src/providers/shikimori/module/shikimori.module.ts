import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriController } from '../controller/shikimori.controller';
import { ShikimoriService } from '../service/shikimori.service';
import { ShikimoriHelper } from '../utils/shikimori-helper';

@Module({
  imports: [HttpModule],
  controllers: [ShikimoriController],
  providers: [
    ShikimoriService,
    PrismaService,
    CustomHttpService,
    ShikimoriHelper,
  ],
})
export class ShikimoriModule {}
