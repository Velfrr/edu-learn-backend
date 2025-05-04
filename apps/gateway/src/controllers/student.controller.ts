import { Controller, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { User } from '@shared/database/entities/user.entity';
import { CurrentUser } from '../decorators';
import { AuthGuard } from '../guard';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(@Inject('STUDENT_SERVICE') private readonly client: ClientProxy) {}

  @Get('course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'student', cmd: 'getByCourse' }, { courseId });
  }

  @Get('course/:courseId/progress/:studentId')
  getProgress(@Param('courseId') courseId: string, @Param('studentId') studentId: string) {
    return this.client.send({ role: 'student', cmd: 'getProgress' }, { courseId, studentId });
  }

  @Get('teacher')
  getTeacherStudents(@CurrentUser() user: User) {
    return this.client.send({ role: 'student', cmd: 'getTeacherStudents' }, { teacherId: user.id });
  }

  @Delete(':courseId/:studentId')
  unenroll(@Param() params: { courseId: string; studentId: string }) {
    return this.client.send({ role: 'student', cmd: 'unenroll' }, params);
  }
}
