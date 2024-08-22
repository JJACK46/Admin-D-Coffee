import { Test, TestingModule } from '@nestjs/testing';
import { StockTakingService } from './stock-taking.service';

describe('StockTakingService', () => {
  let service: StockTakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockTakingService],
    }).compile();

    service = module.get<StockTakingService>(StockTakingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
