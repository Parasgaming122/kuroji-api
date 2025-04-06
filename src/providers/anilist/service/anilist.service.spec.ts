import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { AnilistHelper } from '../utils/anilist-helper';
import { AnilistService } from './anilist.service';

describe('AnilistService', () => {
  let service: AnilistService;

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

    service = module.get<AnilistService>(AnilistService);
  });

  it('fetch anilist', async () => {
    const id = 21;
    mockPrismaService.anilist.findUnique.mockResolvedValueOnce(null);

    const result = await service.getAnilist(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
    expect(mockCustomHttpService.getGraphQL).toHaveBeenCalled();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
