import { Test, TestingModule } from '@nestjs/testing';
import { ReleaseIndexerService } from './release-indexer.service';

describe('ReleaseIndexerService', () => {
  let service: ReleaseIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReleaseIndexerService],
    }).compile();

    service = module.get<ReleaseIndexerService>(ReleaseIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
