import { Test, TestingModule } from '@nestjs/testing';
import { LivreCommandeService } from './livre-commande.service';

describe('LivreCommandeService', () => {
  let service: LivreCommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivreCommandeService],
    }).compile();

    service = module.get<LivreCommandeService>(LivreCommandeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
