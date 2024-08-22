import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  usableProductsId?: number[];

  @IsBoolean()
  combo: boolean;

  @IsNumber()
  discountPercentage: number;

  @IsString()
  endDate: string;
}
