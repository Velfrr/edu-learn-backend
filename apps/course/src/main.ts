import { NestFactory } from '@nestjs/core';
import { CourseModule } from './course.module';

async function bootstrap() {
  const app = await NestFactory.create(CourseModule);
  await app.listen(process.env.port ?? 3000);
}

void bootstrap();
