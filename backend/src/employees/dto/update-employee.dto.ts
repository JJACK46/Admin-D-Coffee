import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsInt, IsNumber, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @Exclude()
  branchId: number;

  @IsString()
  title: string;

  @IsNumber()
  earnValue: number;

  @IsInt()
  minWorkHour: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(10)
  tel: string;

  @IsString()
  gender: string;

  @IsString()
  birthDate: string;

  @IsString()
  biography: string;

  @IsString()
  startDate: string;

  @IsString()
  imageUrl: string;
}
