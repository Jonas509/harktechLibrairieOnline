import { Test, TestingModule } from '@nestjs/testing';
import { LivrePanierController } from './livre-panier.controller';
import { LivrePanierService } from './livre-panier.service';

describe('LivrePanierController', () => {
  let controller: LivrePanierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrePanierController],
      providers: [LivrePanierService],
    }).compile();

    controller = module.get<LivrePanierController>(LivrePanierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
