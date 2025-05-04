import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { DatabaseModule } from '@shared/database';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
