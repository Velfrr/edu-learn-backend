import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  createdById: string;
}

export class UpdateCourseDto {
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class GetCoursesByRoleDto {
  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @IsOptional()
  @IsUUID()
  studentId?: string;
}

export class DeleteCourseDto {
  @IsUUID()
  courseId: string;
}

export class GetCourseByIdDto {
  @IsUUID()
  courseId: string;
}

export class EnrollStudentDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  studentId: string;
}

export class UnenrollStudentDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  studentId: string;
}

export class GetEnrolledStudentsDto {
  @IsUUID()
  courseId: string;
}

export class GetCourseWithDetailsDto {
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class ContentOrderItem {
  @IsUUID()
  id: string;

  @IsEnum(['LESSON', 'TEST'])
  type: 'LESSON' | 'TEST';

  @IsInt()
  order: number;
}

export class UpdateContentOrderDto {
  @IsUUID()
  courseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentOrderItem)
  updates: ContentOrderItem[];
}
