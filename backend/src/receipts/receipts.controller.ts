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
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':year/:month')
  findAllWithFilter(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.receiptsService.findAllWithFilter(+year, +month);
  }

  @Get('user/:id')
  findAllWhereUser(@Param('id') id: string) {
    return this.receiptsService.findAllWhereEmployee(+id);
  }

  @Get('customer/:id')
  findAllWhereCustomer(@Param('id') id: string) {
    return this.receiptsService.findAllWhereCustomer(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(+id);
  }
}
