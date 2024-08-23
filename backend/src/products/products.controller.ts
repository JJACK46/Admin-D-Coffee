import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/products/',
        filename: (req, file, callback) => {
          callback(null, `${uuidv4()}${path.extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedFileTypes.includes(file.mimetype)) {
          return callback(
            new Error('Only JPEG, PNG and WEBP files are allowed'),
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
  create(
    @Body('product') createProductDto: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product: CreateProductDto = JSON.parse(createProductDto);
    product.imageName = file.filename;
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/products/',
        filename: (req, file, callback) => {
          callback(null, `${uuidv4()}${path.extname(file.originalname)}`);
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
  update(
    @Param('id') id: string,
    @Body('product') updateProductDto: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product: UpdateProductDto = JSON.parse(updateProductDto);
    product.imageName = file.filename;
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
