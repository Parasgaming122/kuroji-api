import { Test, TestingModule } from '@nestjs/testing';
import { AnilistService } from './anilist.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriService } from '../../shikimori/service/shikimori.service';
import { CustomHttpService } from '../../../http/http.service';

describe('AnilistService', () => {
  let service: AnilistService;

  const mockPrismaService = {};
  const mockShikimoriService = {};
  const mockCustomHttpService = {};

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
      ],
    }).compile();

    service = module.get<AnilistService>(AnilistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
