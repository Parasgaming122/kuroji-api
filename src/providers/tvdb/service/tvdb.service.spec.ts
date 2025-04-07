import { Test, TestingModule } from '@nestjs/testing';
import { TvdbService } from './tvdb.service';

describe('TvdbService', () => {
  let service: TvdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvdbService],
    }).compile();

    service = module.get<TvdbService>(TvdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
