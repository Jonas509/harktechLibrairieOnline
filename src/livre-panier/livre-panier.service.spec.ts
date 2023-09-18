import { Test, TestingModule } from '@nestjs/testing';
import { LivrePanierService } from './livre-panier.service';

describe('LivrePanierService', () => {
  let service: LivrePanierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrePanierService],
    }).compile();

    service = module.get<LivrePanierService>(LivrePanierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
