import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsInt()
  branchId: number;

  @IsString()
  title: string;

  @IsNumber()
  salaryWage: number;

  @IsNumber()
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
