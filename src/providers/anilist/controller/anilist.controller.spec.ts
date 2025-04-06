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

  const mockPrismaService = {
    anilist: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockShikimoriService = {};

  const mockCustomHttpService = {
    getGraphQL: jest.fn().mockResolvedValue({
      media: [
        {
          id: 21,
          title: { romaji: 'Test Anime' },
        },
      ],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ShikimoriHelperModule],
      controllers: [AnilistController],
      providers: [
        AnilistService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ShikimoriService,
          useValue: mockShikimoriService,
        },
        {
          provide: CustomHttpService,
          useValue: mockCustomHttpService,
        },
        AnilistHelper,
      ],
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
