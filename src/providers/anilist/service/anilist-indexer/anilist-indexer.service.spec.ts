import { Test, TestingModule } from '@nestjs/testing';
import { AnilistIndexerService } from './anilist-indexer.service';

describe('ReleaseIndexerService', () => {
  let service: AnilistIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnilistIndexerService],
    }).compile();

    service = module.get<AnilistIndexerService>(AnilistIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
