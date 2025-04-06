import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { AnilistHelper } from '../utils/anilist-helper';
import { AnilistService } from './anilist.service';
import { AnilistController } from '../controller/anilist.controller'
import { HttpModule } from '@nestjs/axios'
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';

describe('AnilistService', () => {
  let service: AnilistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnilistService,
        AnilistHelper,
        ShikimoriService,
        PrismaService,
        CustomHttpService
      ],
      controllers: [AnilistController],
      imports: [HttpModule, ShikimoriHelperModule],
    }).compile();

    service = module.get<AnilistService>(AnilistService);
  });

  it('fetch anilist', async () => {
    const id = 21;
    const result = await service.getAnilist(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
