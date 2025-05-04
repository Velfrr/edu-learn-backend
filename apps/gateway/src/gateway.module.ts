import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth.controller';
import { UserMiddleware } from './middleware';
import { DatabaseModule } from '@shared/database';
import { GatewayUserController } from './controllers/user.controller';
import { FeedbackController } from './controllers/feedback.controller';
import { CourseController } from './controllers/course.controller';
import { LessonController } from './controllers/lesson.controller';
import { TestController } from './controllers/test.controller';
import { StudentController } from './controllers/student.controller';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'user_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'FEEDBACK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'feedback_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'COURSE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'course_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'LESSON_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'lesson_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'TEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'test_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'analytics_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'student_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    GatewayUserController,
    FeedbackController,
    CourseController,
    LessonController,
    TestController,
    StudentController,
    AnalyticsController,
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
