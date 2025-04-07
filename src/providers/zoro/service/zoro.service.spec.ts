import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ZoroHelper } from '../utils/zoro-helper';
import { ZoroService } from './zoro.service';
import { SharedModule } from '../../../shared/shared.module'

describe('ZoroService', () => {
  let service: ZoroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, SharedModule],
            providers: [ZoroService, ZoroHelper],
    }).compile();

    service = module.get<ZoroService>(ZoroService);
  });

  it('getZoro', async () => {
    const zoro = await service.getZoro(
      'dr-stone-stone-wars-eve-of-the-battle-special-feature-17236',
    );
    expect(zoro).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
