import { Test, TestingModule } from '@nestjs/testing';
import { AnimepaheController } from './animepahe.controller';
import { HttpModule } from '@nestjs/axios'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { AnilistHelper } from '../../anilist/utils/anilist-helper'
import { ShikimoriService } from '../../shikimori/service/shikimori.service'
import { ShikimoriHelper } from '../../shikimori/utils/shikimori-helper'
import { AnimepaheService } from '../service/animepahe.service'
import { AnimePaheHelper } from '../utils/animepahe-helper'

describe('AnimepaheController', () => {
  let controller: AnimepaheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AnimepaheController],
      providers: [AnimepaheService, CustomHttpService, PrismaService, ShikimoriService, ShikimoriHelper, AnimePaheHelper, AnilistHelper, AnilistService],
    }).compile();

    controller = module.get<AnimepaheController>(AnimepaheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
