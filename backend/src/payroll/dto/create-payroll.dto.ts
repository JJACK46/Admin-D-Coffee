import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { StatusPayment } from '../entities/payroll.entity';
import { PayrollDetailsDTO } from './create-payroll-details.dto';

export class CreatePayrollDto {
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
  @IsPositive()
  netToPay: number;

  @IsNumber()
  totalDeduction: number;

  @IsNumber()
  @IsPositive()
  totalEarnings: number;

  @IsNotEmpty()
  payrollDetails: PayrollDetailsDTO;
}
