import { PartialType } from '@nestjs/swagger';
import { CreatePayrollDto } from './create-payroll.dto';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { StatusPayment } from '../entities/payroll.entity';
import { PayrollDetailsDTO } from './create-payroll-details.dto';

export class UpdatePayrollDto extends PartialType(CreatePayrollDto) {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @IsPositive()
  branchId: number;

  @IsInt()
  @IsPositive()
  employeeId: number;

  @IsString()
  status: StatusPayment;

  @IsString()
  dueDate: string;

  @IsString()
  paidDate: string;

  @IsNumber()
  netToPay: number;

  @IsNumber()
  totalDeduction: number;

  @IsNumber()
  totalEarnings: number;

  @IsNotEmpty()
  payrollDetails: PayrollDetailsDTO;
}
