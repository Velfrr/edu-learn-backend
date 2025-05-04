import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCourseAnalyticsDto {
  @ApiProperty({ format: 'uuid', description: 'ID викладача' })
  @IsUUID()
  teacherId: string;
}
