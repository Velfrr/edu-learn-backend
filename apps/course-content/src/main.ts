import { NestFactory } from '@nestjs/core';
import { CourseContentModule } from './course-content.module';

async function bootstrap() {
  const app = await NestFactory.create(CourseContentModule);
  await app.listen(process.env.port ?? 3000);
}

void bootstrap();
