import { IsInt } from 'class-validator';

export class ProfileDTO {
  @IsInt()
  userId: number;

  @IsInt()
  month: number;

  @IsInt()
  year: number;
}
