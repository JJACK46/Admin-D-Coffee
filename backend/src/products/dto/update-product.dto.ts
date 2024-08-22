import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  imageName: string;
}
