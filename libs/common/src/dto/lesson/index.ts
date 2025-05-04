import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ example: 'Introduction to TypeScript' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Lesson content here...' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  lessonOrder: number;
}

export class UpdateLessonDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  lessonId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  lessonOrder?: number;
}

export class GetLessonByIdDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  lessonId: string;
}

export class GetLessonsByCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class CompleteLessonDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;
}

export class GetLessonStatusDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  lessonId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;
}

export class GetCourseCompletionsDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;
}
