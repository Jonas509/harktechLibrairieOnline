import { Test, TestingModule } from '@nestjs/testing';
import { PaniersService } from './paniers.service';

describe('PaniersService', () => {
  let service: PaniersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaniersService],
    }).compile();

    service = module.get<PaniersService>(PaniersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
