import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
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
