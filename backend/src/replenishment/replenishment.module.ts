import { Module } from '@nestjs/common';
import { ReplenishmentService } from './replenishment.service';
import { ReplenishmentController } from './replenishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Replenishment } from './entities/replenishment.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { ReplenishmentItem } from 'src/replenishment/entities/replenishment-items.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Replenishment,
      Inventory,
      ReplenishmentItem,
      Employee,
      Ingredient,
    ]),
  ],
  controllers: [ReplenishmentController],
  providers: [ReplenishmentService],
})
export class ReplenishmentModule {}
