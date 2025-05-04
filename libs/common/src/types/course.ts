import { Course } from '@shared/database/entities/course.entity';

export interface CourseWithDetails extends Course {
  lessonCount: number;
  studentCount: number;
  completionPercentage?: number;
}
