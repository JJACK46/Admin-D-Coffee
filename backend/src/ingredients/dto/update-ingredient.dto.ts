import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  unit: string;
}
