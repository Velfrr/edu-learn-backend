import { Controller, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { User } from '@shared/database/entities/user.entity';
import { CurrentUser } from '../decorators';
import { AuthGuard } from '../guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Students')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('students')
export class StudentController {
  constructor(@Inject('STUDENT_SERVICE') private readonly client: ClientProxy) {}

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Отримати студентів курсу' })
  @ApiParam({ name: 'courseId', type: String })
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'student', cmd: 'getByCourse' }, { courseId });
  }

  @Get('course/:courseId/progress/:studentId')
  @ApiOperation({ summary: 'Прогрес студента в курсі' })
  @ApiParam({ name: 'courseId', type: String })
  @ApiParam({ name: 'studentId', type: String })
  getProgress(@Param('courseId') courseId: string, @Param('studentId') studentId: string) {
    return this.client.send({ role: 'student', cmd: 'getProgress' }, { courseId, studentId });
  }

  @Get('teacher')
  @ApiOperation({ summary: 'Отримати студентів викладача' })
  getTeacherStudents(@CurrentUser() user: User) {
    return this.client.send({ role: 'student', cmd: 'getTeacherStudents' }, { teacherId: user.id });
  }

  @Delete(':courseId/:studentId')
  @ApiOperation({ summary: 'Відписати студента від курсу' })
  @ApiParam({ name: 'courseId', type: String })
  @ApiParam({ name: 'studentId', type: String })
  unenroll(@Param() params: { courseId: string; studentId: string }) {
    return this.client.send({ role: 'student', cmd: 'unenroll' }, params);
  }
}
