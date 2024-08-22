import { IsInt, IsNumber, IsString } from 'class-validator';

export class BillLineDto {
  @IsInt()
  billId: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
