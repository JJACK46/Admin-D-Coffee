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
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.create(createPayrollDto);
  }

  @Get('pending')
  findAllPending() {
    return this.payrollService.findAllPending();
  }

  @Get('paid')
  findAllPaid() {
    return this.payrollService.findAllPaid();
  }

  @Get('paid/emp/:id')
  findWhereEmpId(@Param('id') id: string) {
    return this.payrollService.findWhereEmpId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(+id, updatePayrollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(+id);
  }
}
