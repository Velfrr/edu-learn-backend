import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserActivityDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  userId: string;
}
