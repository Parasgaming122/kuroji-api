import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { ZoroService } from '../service/zoro.service';

@Module({
  providers: [ZoroService, PrismaService],
})
export class ZoroModule {}
