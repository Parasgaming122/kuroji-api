import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomHttpService } from '../../../http/http.service';
import { PrismaService } from '../../../prisma.service';
import { ShikimoriHelper } from '../utils/shikimori-helper';
import { ShikimoriService } from './shikimori.service';

describe('ShikimoriService', () => {
  let service: ShikimoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ShikimoriService,
        PrismaService,
        CustomHttpService,
        ShikimoriHelper,
      ],
    }).compile();

    service = module.get<ShikimoriService>(ShikimoriService);
  });

  it('fetch shikimori from graphql', async () => {
    const data = await service.getShikimori('21');
    expect(data).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
