import { Test, TestingModule } from '@nestjs/testing';
import { ZoroController } from './zoro.controller';
import { HttpModule } from '@nestjs/axios'
import { ZoroService } from '../service/zoro.service'
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper'
import { CustomHttpService } from '../../../http/http.service'
import { AnilistService } from '../../../providers/anilist/service/anilist.service'
import { AnilistHelper } from '../../../providers/anilist/utils/anilist-helper'
import { ShikimoriService } from '../../../providers/shikimori/service/shikimori.service'
import { ShikimoriHelper } from '../../../providers/shikimori/utils/shikimori-helper'

describe('ZoroController', () => {
  let controller: ZoroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ZoroController],
      providers: [ZoroService, PrismaService, AnilistService, ShikimoriService, ShikimoriHelper, CustomHttpService, ZoroHelper, AnilistHelper]
    }).compile();

    controller = module.get<ZoroController>(ZoroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
