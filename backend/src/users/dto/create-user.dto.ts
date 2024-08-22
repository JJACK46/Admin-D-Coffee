import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;

  @IsInt()
  @IsOptional()
  employeeId: number;

  @IsInt()
  @IsOptional()
  customerId: number;
}
