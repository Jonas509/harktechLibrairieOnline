import { Test, TestingModule } from '@nestjs/testing';
import { LivreCommandeController } from './livre-commande.controller';
import { LivreCommandeService } from './livre-commande.service';

describe('LivreCommandeController', () => {
  let controller: LivreCommandeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivreCommandeController],
      providers: [LivreCommandeService],
    }).compile();

    controller = module.get<LivreCommandeController>(LivreCommandeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
