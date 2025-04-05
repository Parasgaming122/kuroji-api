import { Test, TestingModule } from '@nestjs/testing';
import { ShikimoriController } from './shikimori.controller';

describe('ShikimoriController', () => {
  let controller: ShikimoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShikimoriController],
    }).compile();

    controller = module.get<ShikimoriController>(ShikimoriController);
  });

  it('get Shikimori check', () => {});

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
