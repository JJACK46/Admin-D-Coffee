import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsInt, IsOptional } from 'class-validator';
import { UpdateInventoryItemDto } from 'src/inventory/dto/update-inventory-item.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @IsInt()
  id: number;

  @IsOptional()
  inventoryItems: UpdateInventoryItemDto[];
}
