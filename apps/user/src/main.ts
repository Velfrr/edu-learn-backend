import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('User microservice is listening on RabbitMQ');
}

void bootstrap();
