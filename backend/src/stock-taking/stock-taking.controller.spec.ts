import { Test, TestingModule } from '@nestjs/testing';
import { StockTakingController } from './stock-taking.controller';
import { StockTakingService } from './stock-taking.service';

describe('StockTakingController', () => {
  let controller: StockTakingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockTakingController],
      providers: [StockTakingService],
    }).compile();

    controller = module.get<StockTakingController>(StockTakingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
