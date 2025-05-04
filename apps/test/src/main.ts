import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TestModule } from './test.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TestModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'test_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Test microservice is listening on RabbitMQ');
}

void bootstrap();
