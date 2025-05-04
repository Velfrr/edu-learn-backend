import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AnalyticsModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'analytics_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log(`Analytics microservice is listening on RabbitMQ`);
}

void bootstrap();
