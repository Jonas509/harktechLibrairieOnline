import { Test, TestingModule } from '@nestjs/testing';
import { LivresController } from './livres.controller';
import { LivresService } from './livres.service';

describe('LivresController', () => {
  let controller: LivresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivresController],
      providers: [LivresService],
    }).compile();

    controller = module.get<LivresController>(LivresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
