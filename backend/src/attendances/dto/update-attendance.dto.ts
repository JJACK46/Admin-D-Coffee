import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { TypeWork } from '../entities/attendance.entity';
import { IsInt, IsString } from 'class-validator';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @IsInt()
  id: number;

  @IsString()
  clockOut: string;

  @IsInt()
  timeWorked: number;

  @IsString()
  typeWork: TypeWork;
}
