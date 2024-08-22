import { IsInt, IsString } from 'class-validator';
import { TypeWork } from '../entities/attendance.entity';

export class CreateAttendanceDto {
  @IsString()
  date: string;

  @IsInt()
  employeeId: number;

  @IsString()
  clockIn: string;

  @IsString()
  clockOut: string;

  @IsInt()
  timeWorked: number;

  @IsString()
  typeWork: TypeWork;
}
