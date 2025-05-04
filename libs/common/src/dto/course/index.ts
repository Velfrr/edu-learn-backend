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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Frontend Basics' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn HTML, CSS, and JavaScript from scratch' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsString()
  createdById: string;
}

export class UpdateCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class GetCoursesByRoleDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  studentId?: string;
}

export class DeleteCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class GetCourseByIdDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class EnrollStudentDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  studentId: string;
}

export class UnenrollStudentDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  studentId: string;
}

export class GetEnrolledStudentsDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class GetCourseWithDetailsDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class ContentOrderItem {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: ['LESSON', 'TEST'] })
  @IsEnum(['LESSON', 'TEST'])
  type: 'LESSON' | 'TEST';

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;
}

export class UpdateContentOrderDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ type: [ContentOrderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentOrderItem)
  updates: ContentOrderItem[];
}
