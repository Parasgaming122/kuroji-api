import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../http/http.service';
import { PrismaService } from '../prisma.service';
import { AnilistService } from '../providers/anilist/service/anilist.service';
import { AnimekaiService } from '../providers/animekai/service/animekai.service';
import { AnimeKaiHelper } from '../providers/animekai/utils/animekai-helper';
import { AnimepaheService } from '../providers/animepahe/service/animepahe.service';
import { AnimePaheHelper } from '../providers/animepahe/utils/animepahe-helper';
import { ShikimoriService } from '../providers/shikimori/service/shikimori.service';
import { ShikimoriHelper } from '../providers/shikimori/utils/shikimori-helper';
import { UpdateService } from './update.service';

describe('UpdateService', () => {
  let service: UpdateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CustomHttpService,
        ShikimoriService,
        ShikimoriHelper,
        AnimekaiService,
        AnimeKaiHelper,
        AnimepaheService,
        AnimePaheHelper,
        UpdateService,
        {
          provide: PrismaService,
          useValue: {
            lastUpdated: {
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: AnilistService,
          useValue: {
            fetchAnilistFromGraphQL: jest.fn(),
            saveAnilist: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateService>(UpdateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should not update if LastUpdated records are newer than 12 hours', async () => {
    const now = new Date();
    const elevenHoursAgo = new Date(now.getTime() - 11 * 60 * 60 * 1000);

    // Mock LastUpdated return value
    (prisma.lastUpdated.findMany as jest.Mock).mockResolvedValue([
      {
        createdAt: elevenHoursAgo,
        type: 'ANILIST',
        entityId: '123',
      },
    ]);

    // Spy on save/fetch
    const saveSpy = jest.spyOn(service['AniService'], 'saveAnilist');
    const fetchSpy = jest.spyOn(
      service['AniService'],
      'fetchAnilistFromGraphQL',
    );

    // Run it
    await service.update();

    // Assertions
    expect(saveSpy).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
