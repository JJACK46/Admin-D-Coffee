import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

interface CreateReceiptItemDto {
  amount: number;
  productId: number;
  price: number;
}
export class CreateReceiptDto {
  @IsArray()
  receiptItems: CreateReceiptItemDto[];

  @IsInt()
  @IsOptional()
  promotionId: number;

  @IsInt()
  @IsPositive()
  employeeId: number;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  totalDiscount: number;

  @IsNumber()
  @IsOptional()
  usedPoint: number;

  @IsNumber()
  @IsOptional()
  earnPoint: number;

  @IsNumber()
  @IsOptional()
  totalPoint: number;

  @IsNumber()
  totalNet: number;

  @IsNumber()
  receivedAmount: number;

  @IsNumber()
  change: number;

  @IsString()
  createdDate: string;

  @IsString()
  createdTime: string;

  @IsString()
  paymentType: string;

  @IsInt()
  branchId: number;

  @IsInt()
  @IsOptional()
  customerId: number;
}
