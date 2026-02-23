import { Test, TestingModule } from '@nestjs/testing';
import { AmbitsController } from './ambits.controller';

describe('AmbitsController', () => {
  let controller: AmbitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmbitsController],
    }).compile();

    controller = module.get<AmbitsController>(AmbitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
