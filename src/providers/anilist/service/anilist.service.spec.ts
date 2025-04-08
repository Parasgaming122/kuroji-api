import { Test, TestingModule } from '@nestjs/testing';
import { AnilistService } from './anilist.service';
import { AnilistController } from '../controller/anilist.controller'
import { HttpModule } from '@nestjs/axios'
import { ShikimoriHelperModule } from '../../shikimori/module/shikimori-helper.module';
import { SharedModule } from '../../../shared/shared.module'

describe('AnilistService', () => {
  let service: AnilistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnilistController],
      imports: [HttpModule, ShikimoriHelperModule, SharedModule],
    }).compile();

    service = module.get<AnilistService>(AnilistService);
  });

  it('fetch anilist', async () => {
    const id = 21;
    const result = await service.getAnilist(id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(id);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
