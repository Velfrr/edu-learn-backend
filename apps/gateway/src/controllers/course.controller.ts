import {
  Controller,
  UseGuards,
  Inject,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ContentOrderItem,
  CreateCourseDto,
  EnrollStudentDto,
  UnenrollStudentDto,
  UpdateCourseDto,
  UserRole,
} from '@shared/common';
import { CurrentUser, Roles } from '../decorators';
import { AuthGuard } from '../guard';
import { User } from '@shared/database/entities/user.entity';

@Controller('courses')
@UseGuards(AuthGuard)
export class CourseController {
  constructor(@Inject('COURSE_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() dto: CreateCourseDto, @CurrentUser() user: User) {
    return this.client.send({ role: 'course', cmd: 'create' }, { ...dto, createdBy: user.id });
  }

  @Patch()
  update(@Body() dto: UpdateCourseDto) {
    return this.client.send({ role: 'course', cmd: 'update' }, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'course', cmd: 'delete' }, id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'course', cmd: 'getById' }, { courseId: id });
  }

  @Get()
  getAll() {
    return this.client.send({ role: 'course', cmd: 'getAll' }, {});
  }

  @Get('teacher/:teacherId')
  getByTeacher(@Param('teacherId') teacherId: string) {
    return this.client.send({ role: 'course', cmd: 'getByTeacher' }, { teacherId });
  }

  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.client.send({ role: 'course', cmd: 'getByStudent' }, { studentId });
  }

  @Post('enroll')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  enroll(@Body() dto: EnrollStudentDto) {
    return this.client.send({ role: 'course', cmd: 'enroll' }, dto);
  }

  @Post('unenroll')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  unenroll(@Body() dto: UnenrollStudentDto) {
    return this.client.send({ role: 'course', cmd: 'unenroll' }, dto);
  }

  @Get(':id/students')
  getEnrolledStudents(@Param('id') courseId: string) {
    return this.client.send({ role: 'course', cmd: 'getEnrolledStudents' }, { courseId });
  }

  @Get(':id/details')
  getCourseWithDetails(@Param('id') courseId: string, @CurrentUser() user?: User) {
    return this.client.send(
      { role: 'course', cmd: 'getCourseWithDetails' },
      {
        courseId,
        userId: user?.id,
      },
    );
  }

  @Patch(':id/content-order')
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  updateContentOrder(@Param('id') courseId: string, @Body() body: ContentOrderItem[]) {
    return this.client.send(
      { role: 'course', cmd: 'updateContentOrder' },
      { courseId, updates: body },
    );
  }
}
