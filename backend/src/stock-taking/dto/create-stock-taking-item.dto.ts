import { IsInt } from 'class-validator';

export class CreateStockTakingItemDto {
  @IsInt()
  balanceOld: number;

  @IsInt()
  balanceUpdate: number;

  @IsInt()
  stockTaking: number;

  @IsInt()
  inventoryItemId: number;
}
