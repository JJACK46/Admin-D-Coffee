import { Test, TestingModule } from '@nestjs/testing';
import { ReplenishmentService } from './replenishment.service';

describe('ReplenishmentService', () => {
  let service: ReplenishmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplenishmentService],
    }).compile();

    service = module.get<ReplenishmentService>(ReplenishmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
