import { Module } from '@nestjs/common';
import { StockTakingService } from './stock-taking.service';
import { StockTakingController } from './stock-taking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTaking } from './entities/stock-taking.entity';
import { StockTakingItem } from 'src/stock-taking/entities/stock-taking-item.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockTaking,
      StockTakingItem,
      Employee,
      Inventory,
      InventoryItem,
    ]),
  ],
  controllers: [StockTakingController],
  providers: [StockTakingService],
})
export class StockTakingModule {}
