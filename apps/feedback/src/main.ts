import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FeedbackModule } from './feedback.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FeedbackModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
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
