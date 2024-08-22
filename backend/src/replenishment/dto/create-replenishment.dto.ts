import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';
import { CreateReplenishmentItemDto } from 'src/replenishment/dto/create-replenishment-items.dto';

export class CreateReplenishmentDto {
  @IsString()
  createdDate: string;

  @IsInt()
  employeeId: number;

  @IsNumber()
  totalCost: number;

  @IsInt()
  inventoryId: number;

  @IsArray()
  replenishmentItems: CreateReplenishmentItemDto[];
}
