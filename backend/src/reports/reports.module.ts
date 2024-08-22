import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Branch])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
