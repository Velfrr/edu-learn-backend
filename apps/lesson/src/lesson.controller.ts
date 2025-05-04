import { Controller } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateLessonDto,
  UpdateLessonDto,
  GetLessonByIdDto,
  CompleteLessonDto,
  GetCourseCompletionsDto,
  GetLessonsByCourseDto,
  GetLessonStatusDto,
} from '@shared/common';

@Controller()
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @MessagePattern({ role: 'lesson', cmd: 'create' })
  create(@Payload() dto: CreateLessonDto) {
    return this.lessonService.create(dto);
  }

  @MessagePattern({ role: 'lesson', cmd: 'update' })
  update(@Payload() dto: UpdateLessonDto) {
    return this.lessonService.update(dto);
  }

  @MessagePattern({ role: 'lesson', cmd: 'delete' })
  delete(@Payload() id: string) {
    return this.lessonService.delete(id);
  }

  @MessagePattern({ role: 'lesson', cmd: 'getById' })
  getById(@Payload() dto: GetLessonByIdDto) {
    return this.lessonService.getById(dto.lessonId);
  }

  @MessagePattern({ role: 'lesson', cmd: 'getByCourse' })
  getByCourse(@Payload() dto: GetLessonsByCourseDto) {
    return this.lessonService.getByCourse(dto.courseId);
  }

  @MessagePattern({ role: 'lesson', cmd: 'complete' })
  completeLesson(@Payload() dto: CompleteLessonDto) {
    return this.lessonService.completeLesson(dto);
  }

  @MessagePattern({ role: 'lesson', cmd: 'status' })
  getStatus(@Payload() dto: GetLessonStatusDto) {
    return this.lessonService.getCompletionStatus(dto);
  }

  @MessagePattern({ role: 'lesson', cmd: 'courseCompletions' })
  getCompletions(@Payload() dto: GetCourseCompletionsDto) {
    return this.lessonService.getCompletionsByCourse(dto);
  }
}
