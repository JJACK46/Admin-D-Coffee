import { IsInt, IsString } from 'class-validator';

export class TrackAttendanceDto {
  @IsInt()
  employeeId: number;
  @IsString()
  date: string;
}
