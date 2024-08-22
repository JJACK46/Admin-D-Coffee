import { PartialType } from '@nestjs/swagger';
import { CreateInventoryItemDto } from './create-inventory-item.dto';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class UpdateInventoryItemDto extends PartialType(
  CreateInventoryItemDto,
) {
  @IsInt()
  id: number;

  @IsInt()
  @IsPositive()
  inventoryId: number;

  @IsInt()
  @IsPositive()
  ingredientId: number;

  @IsNumber()
  balance: number;

  @IsNumber()
  minBalance: number;
}
