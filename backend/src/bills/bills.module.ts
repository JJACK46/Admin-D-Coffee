import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { BillLines } from './entities/bill-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillLines])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
