import { IsString } from 'class-validator';

export class UpdateUserActivityDto {
  @IsString()
  userId: string;
}
