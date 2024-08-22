import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { CreateInventoryItemDto } from 'src/inventory/dto/create-inventory-item.dto';

export class CreateInventoryDto {
  @IsInt()
  @IsPositive()
  branchId: number;

  @IsOptional()
  inventoryItems: CreateInventoryItemDto[];
}
