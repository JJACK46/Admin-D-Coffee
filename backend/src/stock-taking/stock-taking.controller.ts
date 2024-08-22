import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { StockTakingService } from './stock-taking.service';
import { CreateStockTakingDto } from './dto/create-stock-taking.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('stock-taking')
export class StockTakingController {
  constructor(private readonly stockTakingService: StockTakingService) {}

  @Post()
  create(@Body() createStockTakingDto: CreateStockTakingDto) {
    return this.stockTakingService.create(createStockTakingDto);
  }

  @Get()
  findAll() {
    return this.stockTakingService.findAll();
  }

  @Get(':year/:month')
  findAllWithFilter(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.stockTakingService.findAllWithFilter(+year, +month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTakingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockTakingService.remove(+id);
  }
}
