import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseContentService {
  getHello(): string {
    return 'Hello World!';
  }
}
