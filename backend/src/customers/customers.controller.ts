import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import * as path from 'path';
import { Public } from 'src/auth/constants';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/customers/',
        filename: (req, file, callback) => {
          const filename = `${v4()}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedFileTypes = ['image/jpeg', 'image/png'];
        if (!allowedFileTypes.includes(file.mimetype)) {
          return callback(
            new Error('Only JPEG and PNG files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1e6,
      },
    }),
  )
  create(@Body('customer') dto, @UploadedFile() file: Express.Multer.File) {
    const emp: CreateCustomerDto = JSON.parse(dto);
    emp.imageUrl = file.filename;
    return this.customersService.create(emp);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Public()
  @Get('purchase')
  findAllWithPurchase() {
    return this.customersService.findAllWithPurchase();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(+id);
  }

  @Get(':id/purchase/count')
  findPurchaseCountByCustomerId(@Param('id') id: number) {
    return this.customersService.findPurchaseCountByCustomerId(+id);
  }

  @Get(':id/purchase')
  findPurchaseByCusId(@Param('id') id: number) {
    return this.customersService.findPurchaseByCusId(+id);
  }

  @Patch()
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(updateCustomerDto);
  }

  @Patch(':id/:points')
  updatePoints(@Param('id') id: number, @Param('points') points: number) {
    return this.customersService.updatePoints(+id, +points);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(+id);
  }
}
