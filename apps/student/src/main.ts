import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StudentModule } from './student.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StudentModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'student_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log(`Student microservice is listening on RabbitMQ`);
}

void bootstrap();
