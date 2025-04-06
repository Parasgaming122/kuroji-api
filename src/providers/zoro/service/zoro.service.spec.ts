import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ZoroHelper } from '../utils/zoro-helper';
import { ZoroService } from './zoro.service';

describe('ZoroService', () => {
  let service: ZoroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ZoroService, CustomHttpService, ZoroHelper, PrismaService],
    }).compile();

    service = module.get<ZoroService>(ZoroService);
  });

  it('getZoro', async () => {
    const zoro = await service.getZoro(
      'dr-stone-stone-wars-eve-of-the-battle-special-feature-17236',
    );
    console.log(zoro);
    expect(zoro).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
