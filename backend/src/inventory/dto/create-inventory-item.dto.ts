import { IsInt, IsNumber } from 'class-validator';

export class CreateInventoryItemDto {
  @IsInt()
  inventoryId: number;

  @IsInt()
  ingredientId: number;

  @IsNumber()
  balance: number;

  @IsNumber()
  minBalance: number;
}
