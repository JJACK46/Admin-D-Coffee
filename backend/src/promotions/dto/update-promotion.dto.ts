import { PartialType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @IsInt()
  id: number;

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
