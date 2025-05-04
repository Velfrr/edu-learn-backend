import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateLessonDto {
  @IsUUID()
  courseId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  lessonOrder: number;
}

export class UpdateLessonDto {
  @IsUUID()
  lessonId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  lessonOrder?: number;
}

export class GetLessonByIdDto {
  @IsUUID()
  lessonId: string;
}

export class GetLessonsByCourseDto {
  @IsUUID()
  courseId: string;
}

export class CompleteLessonDto {
  @IsUUID()
  lessonId: string;

  @IsUUID()
  userId: string;
}

export class GetLessonStatusDto {
  @IsUUID()
  lessonId: string;

  @IsUUID()
  userId: string;
}

export class GetCourseCompletionsDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  userId: string;
}
