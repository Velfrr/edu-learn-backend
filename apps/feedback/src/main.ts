import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FeedbackModule } from './feedback.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FeedbackModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'feedback_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Feedback microservice is listening on RabbitMQ');
}

void bootstrap();
