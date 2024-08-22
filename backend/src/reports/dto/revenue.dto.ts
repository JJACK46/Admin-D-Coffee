import { IsInt, IsOptional } from 'class-validator';

export class RevenueDTO {
  @IsInt()
  @IsOptional()
  branchId: number;

  @IsInt()
  month: number;

  @IsInt()
  year: number;
}
