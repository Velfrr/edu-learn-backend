import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LessonModule } from './lesson.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(LessonModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'lesson_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Lesson microservice is listening on RabbitMQ');
}

void bootstrap();
