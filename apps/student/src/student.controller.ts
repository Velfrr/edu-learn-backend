import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetStudentsByCourseDto,
  GetStudentProgressDto,
  GetTeacherStudentsDto,
  UnenrollStudentDto,
} from '@shared/common';

@Controller()
export class StudentController {
  constructor(private readonly service: StudentService) {}

  @MessagePattern({ role: 'student', cmd: 'getByCourse' })
  getByCourse(@Payload() dto: GetStudentsByCourseDto) {
    return this.service.getStudentsByCourse(dto.courseId);
  }

  @MessagePattern({ role: 'student', cmd: 'getProgress' })
  getProgress(@Payload() dto: GetStudentProgressDto) {
    return this.service.getStudentProgress(dto.courseId, dto.studentId);
  }

  @MessagePattern({ role: 'student', cmd: 'getTeacherStudents' })
  getTeacherStudents(@Payload() dto: GetTeacherStudentsDto) {
    return this.service.getTeacherStudents(dto.teacherId);
  }

  @MessagePattern({ role: 'student', cmd: 'unenroll' })
  unenroll(@Payload() dto: UnenrollStudentDto) {
    return this.service.unenrollStudent(dto.courseId, dto.studentId);
  }
}
