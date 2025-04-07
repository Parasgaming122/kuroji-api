import { Test, TestingModule } from '@nestjs/testing';
import { AnimekaiService } from './animekai.service';
import { HttpModule } from '@nestjs/axios'
import { SharedModule } from '../../../shared/shared.module'
import { AnimeKaiHelper } from '../utils/animekai-helper'

describe('AnimekaiService', () => {
  let service: AnimekaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, SharedModule],
      providers: [AnimekaiService, AnimeKaiHelper],
    }).compile();

    service = module.get<AnimekaiService>(AnimekaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
