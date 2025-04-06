import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { AnilistService } from '../service/anilist.service';
import { AnilistHelper } from '../utils/anilist-helper';
import { AnilistController } from './anilist.controller';

describe('AnilistController', () => {
  let controller: AnilistController;

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

    controller = module.get<AnilistController>(AnilistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get anilist', async () => {
    const id = 21;
    const result = await controller.getAnilist(id);
    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
  });
});
