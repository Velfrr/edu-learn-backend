import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CourseModule } from './course.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CourseModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'course_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Course microservice is listening on RabbitMQ');
}

void bootstrap();
