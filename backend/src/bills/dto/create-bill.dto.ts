import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { BillLineDto } from './bill-lines.dto';

export class CreateBillDto {
  @IsString()
  date: string;

  @IsNumber()
  worth: number;

  @IsBoolean()
  status: boolean;

  @IsString()
  category: string;

  @IsArray()
  lines: BillLineDto[];
}
