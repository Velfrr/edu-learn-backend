import { IsEmail, IsUUID } from 'class-validator';

export class GetStudentsByCourseDto {
  @IsUUID()
  courseId: string;
}

export class GetStudentProgressDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  studentId: string;
}

export class GetTeacherStudentsDto {
  @IsUUID()
  teacherId: string;
}

export class EnrollStudentByEmailDto {
  @IsUUID()
  courseId: string;

  @IsEmail()
  email: string;
}

export class UnenrollStudentFromCourseDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  studentId: string;
}
