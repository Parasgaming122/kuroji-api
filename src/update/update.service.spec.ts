import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UpdateService } from './update.service';
import { SharedModule } from '../shared/shared.module'

describe('UpdateService', () => {
  let service: UpdateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, SharedModule],
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
