import { IsEmail, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetStudentsByCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class GetStudentProgressDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  studentId: string;
}

export class GetTeacherStudentsDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  teacherId: string;
}

export class EnrollStudentByEmailDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email: string;
}

export class UnenrollStudentFromCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  studentId: string;
}
