import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ZoroWithRelations } from '../service/zoro.service';

@Injectable()
export class ZoroHelper {
  getZoroData(zoro: ZoroWithRelations): Prisma.ZoroCreateInput {
    return {
      id: zoro.id,
      title: zoro.title,
      malID: zoro.malID,
      alID: zoro.alID,
      japaneseTitle: zoro.japaneseTitle,
      image: zoro.image,
      description: zoro.description,
      type: zoro.type,
      url: zoro.url,
      subOrDub: zoro.subOrDub,
      hasSub: zoro.hasSub,
      hasDub: zoro.hasDub,
      status: zoro.status,
      season: zoro.season,
      totalEpisodes: zoro.totalEpisodes,
      episodes: zoro.episodes || [],
    };
  }
}
