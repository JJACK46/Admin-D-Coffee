import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Attendance, Payroll])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
