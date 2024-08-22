import { Test, TestingModule } from '@nestjs/testing';
import { ReplenishmentController } from './replenishment.controller';
import { ReplenishmentService } from './replenishment.service';

describe('ReplenishmentController', () => {
  let controller: ReplenishmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplenishmentController],
      providers: [ReplenishmentService],
    }).compile();

    controller = module.get<ReplenishmentController>(ReplenishmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
