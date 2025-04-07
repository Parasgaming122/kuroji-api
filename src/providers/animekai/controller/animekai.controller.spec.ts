import { Test, TestingModule } from '@nestjs/testing';
import { AnimekaiController } from './animekai.controller';
import { HttpModule } from '@nestjs/axios'
import { SharedModule } from '../../../shared/shared.module'
import { AnimekaiService } from '../service/animekai.service'
import { AnimeKaiHelper } from '../utils/animekai-helper'

describe('AnimekaiController', () => {
  let controller: AnimekaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, SharedModule],
      controllers: [AnimekaiController],
      providers: [AnimekaiService, AnimeKaiHelper],
    }).compile();

    controller = module.get<AnimekaiController>(AnimekaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
