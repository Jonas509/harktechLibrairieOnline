import { Test, TestingModule } from '@nestjs/testing';
import { LivresService } from './livres.service';

describe('LivresService', () => {
  let service: LivresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivresService],
    }).compile();

    service = module.get<LivresService>(LivresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
