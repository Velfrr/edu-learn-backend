import { Module } from '@nestjs/common';
import { CourseContentController } from './course-content.controller';
import { CourseContentService } from './course-content.service';

@Module({
  imports: [],
  controllers: [CourseContentController],
  providers: [CourseContentService],
})
export class CourseContentModule {}
