import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper';
import { ZoroService } from './zoro.service';
import { AnilistService } from '../../../providers/anilist/service/anilist.service'
import { AnilistHelper } from '../../../providers/anilist/utils/anilist-helper'
import { ShikimoriService } from '../../../providers/shikimori/service/shikimori.service'
import { ShikimoriHelper } from '../../../providers/shikimori/utils/shikimori-helper'

describe('ZoroService', () => {
  let service: ZoroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ZoroService, PrismaService, AnilistService, ShikimoriService, ShikimoriHelper, CustomHttpService, ZoroHelper, AnilistHelper],
    }).compile();

    service = module.get<ZoroService>(ZoroService);
  });

  it('getZoro', async () => {
    const zoro = await service.getZoro(
      'dr-stone-stone-wars-eve-of-the-battle-special-feature-17236',
    );
    expect(zoro).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
