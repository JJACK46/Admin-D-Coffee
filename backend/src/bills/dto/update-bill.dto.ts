import { PartialType } from '@nestjs/swagger';
import { CreateBillDto } from './create-bill.dto';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  @IsInt()
  billId: number;

  @IsBoolean()
  status: boolean;
}
