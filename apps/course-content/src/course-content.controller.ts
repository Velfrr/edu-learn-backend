import { Controller, Get } from '@nestjs/common';
import { CourseContentService } from './course-content.service';

@Controller()
export class CourseContentController {
  constructor(private readonly courseContentService: CourseContentService) {}

  @Get()
  getHello(): string {
    return this.courseContentService.getHello();
  }
}
