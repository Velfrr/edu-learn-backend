import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  userId: string;
}
