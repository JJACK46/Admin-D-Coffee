import { IsArray, IsInt, IsString } from 'class-validator';
import { CreateStockTakingItemDto } from 'src/stock-taking/dto/create-stock-taking-item.dto';

export class CreateStockTakingDto {
  @IsString()
  createdDate: string;

  @IsArray()
  stockTakingItems: CreateStockTakingItemDto[];

  @IsInt()
  employeeId: number;

  @IsInt()
  inventoryId: number;
}
