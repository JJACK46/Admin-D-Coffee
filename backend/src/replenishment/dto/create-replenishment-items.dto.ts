import { IsInt, IsNumber } from 'class-validator';

export class CreateReplenishmentItemDto {
  @IsInt()
  replenishmentId: number;

  @IsInt()
  ingredientId: number;

  @IsInt()
  balance: number;

  @IsNumber()
  cost: number;
}
