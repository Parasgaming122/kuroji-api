import { Test, TestingModule } from '@nestjs/testing';
import { AnilistIndexerService } from './anilist-indexer.service';
import { PrismaService } from '../../../../prisma.service'
import { AnilistService } from '../anilist.service'
import { CustomHttpService } from '../../../../http/http.service'
import { ShikimoriService } from '../../../shikimori/service/shikimori.service'
import { AnilistHelper } from '../../utils/anilist-helper'
import { ShikimoriHelper } from '../../../shikimori/utils/shikimori-helper'
import { HttpModule, HttpService } from '@nestjs/axios'

describe('ReleaseIndexerService', () => {
  let service: AnilistIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AnilistIndexerService, PrismaService, AnilistService, ShikimoriService, CustomHttpService, AnilistHelper, ShikimoriHelper],
    }).compile();

    service = module.get<AnilistIndexerService>(AnilistIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
