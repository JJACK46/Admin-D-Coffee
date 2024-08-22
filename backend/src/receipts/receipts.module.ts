import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { ReceiptItem } from './entities/receipt-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receipt,
      Promotion,
      Employee,
      Branch,
      Customer,
      ReceiptItem,
      Product,
    ]),
  ],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
