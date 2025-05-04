import { IsUUID } from 'class-validator';

export class GetCourseAnalyticsDto {
  @IsUUID()
  teacherId: string;
}
