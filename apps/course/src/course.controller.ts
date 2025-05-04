import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateCourseDto,
  EnrollStudentDto,
  GetCourseByIdDto,
  GetCourseWithDetailsDto,
  GetEnrolledStudentsDto,
  UnenrollStudentDto,
  UpdateContentOrderDto,
  UpdateCourseDto,
} from '@shared/common';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern({ role: 'course', cmd: 'create' })
  create(@Payload() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @MessagePattern({ role: 'course', cmd: 'update' })
  update(@Payload() dto: UpdateCourseDto) {
    return this.courseService.update(dto);
  }

  @MessagePattern({ role: 'course', cmd: 'delete' })
  delete(@Payload() courseId: string) {
    return this.courseService.delete(courseId);
  }

  @MessagePattern({ role: 'course', cmd: 'getById' })
  getById(@Payload() dto: GetCourseByIdDto) {
    return this.courseService.getById(dto.courseId);
  }

  @MessagePattern({ role: 'course', cmd: 'getAll' })
  getAll() {
    return this.courseService.getAll();
  }

  @MessagePattern({ role: 'course', cmd: 'getByTeacher' })
  getByTeacher(@Payload() dto: { teacherId: string }) {
    return this.courseService.getByTeacher(dto.teacherId);
  }

  @MessagePattern({ role: 'course', cmd: 'getByStudent' })
  getByStudent(@Payload() dto: { studentId: string }) {
    return this.courseService.getByStudent(dto.studentId);
  }

  @MessagePattern({ role: 'course', cmd: 'enroll' })
  enroll(@Payload() dto: EnrollStudentDto) {
    return this.courseService.enroll(dto);
  }

  @MessagePattern({ role: 'course', cmd: 'unenroll' })
  unenroll(@Payload() dto: UnenrollStudentDto) {
    return this.courseService.unenroll(dto);
  }

  @MessagePattern({ role: 'course', cmd: 'getEnrolledStudents' })
  getEnrolledStudents(@Payload() dto: GetEnrolledStudentsDto) {
    return this.courseService.getEnrolledStudents(dto.courseId);
  }

  @MessagePattern({ role: 'course', cmd: 'getCourseWithDetails' })
  getCourseWithDetails(@Payload() dto: GetCourseWithDetailsDto) {
    return this.courseService.getCourseWithDetails(dto);
  }

  @MessagePattern({ role: 'course', cmd: 'updateContentOrder' })
  updateContentOrder(@Payload() dto: UpdateContentOrderDto) {
    return this.courseService.updateContentOrder(dto);
  }
}
