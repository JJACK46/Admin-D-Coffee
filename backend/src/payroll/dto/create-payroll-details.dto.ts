import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class PayrollDetailsDTO {
  @IsInt()
  @IsPositive()
  slipId: number;

  @IsNumber()
  salaryWage: number;

  @IsNumber()
  bonus: number;

  @IsNumber()
  incentive: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  socialSecurityFund: number;

  @IsNumber()
  otherEarn: number;

  @IsNumber()
  positionAllowance: number;

  @IsNumber()
  otherDeduction: number;

  @IsNumber()
  overtime: number;

  @IsNumber()
  absentLeaveLate: number;

  @IsNumber()
  insurance: number;

  @IsNumber()
  welfare: number;
}
