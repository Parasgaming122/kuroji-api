import { Test, TestingModule } from '@nestjs/testing';
import { TmdbController } from './tmdb.controller';
import { HttpModule } from '@nestjs/axios'
import { SharedModule } from '../../../shared/shared.module'
import { TmdbService } from '../service/tmdb.service'
import { TmdbHelper } from '../utils/tmdb-helper'

describe('TmdbController', () => {
  let controller: TmdbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, SharedModule],
      controllers: [TmdbController],
      providers: [TmdbService, TmdbHelper],
    }).compile();

    controller = module.get<TmdbController>(TmdbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
