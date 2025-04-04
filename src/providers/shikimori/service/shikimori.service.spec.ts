import { Test, TestingModule } from '@nestjs/testing';
import { ShikimoriService } from './shikimori.service';

describe('ShikimoriService', () => {
  let service: ShikimoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShikimoriService],
    }).compile();

    service = module.get<ShikimoriService>(ShikimoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
