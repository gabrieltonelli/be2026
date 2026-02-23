import { Test, TestingModule } from '@nestjs/testing';
import { AmbitsService } from './ambits.service';

describe('AmbitsService', () => {
  let service: AmbitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmbitsService],
    }).compile();

    service = module.get<AmbitsService>(AmbitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
