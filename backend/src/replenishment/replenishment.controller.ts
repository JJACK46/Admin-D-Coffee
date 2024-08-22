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
import { ReplenishmentService } from './replenishment.service';
import { CreateReplenishmentDto } from './dto/create-replenishment.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('replenishment')
export class ReplenishmentController {
  constructor(private readonly replenishmentService: ReplenishmentService) {}

  @Post()
  create(@Body() createReplenishmentDto: CreateReplenishmentDto) {
    return this.replenishmentService.create(createReplenishmentDto);
  }

  @Get()
  findAll() {
    return this.replenishmentService.findAll();
  }

  @Get(':year/:month')
  findAllWithFilter(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    return this.replenishmentService.findAllWithFilter(+year, +month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replenishmentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replenishmentService.remove(+id);
  }
}
