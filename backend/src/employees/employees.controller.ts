import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import * as path from 'path';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/employees/',
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
  create(@Body('employee') dto, @UploadedFile() file: Express.Multer.File) {
    const emp: CreateEmployeeDto = JSON.parse(dto);
    emp.imageUrl = file.filename;
    return this.employeesService.create(emp);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/employees/',
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
  update(
    @Param('id') id: string,
    @Body('employee') dto: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const emp: UpdateEmployeeDto = JSON.parse(dto);
    emp.imageUrl = file?.filename;
    return this.employeesService.update(+id, emp);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
