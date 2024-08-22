import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;
}
