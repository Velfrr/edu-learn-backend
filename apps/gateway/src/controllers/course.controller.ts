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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('courses')
export class CourseController {
  constructor(@Inject('COURSE_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Створити курс' })
  @ApiBody({ type: CreateCourseDto })
  create(@Body() dto: CreateCourseDto, @CurrentUser() user: User) {
    return this.client.send({ role: 'course', cmd: 'create' }, { ...dto, createdBy: user.id });
  }

  @Patch()
  @ApiOperation({ summary: 'Оновити курс' })
  @ApiBody({ type: UpdateCourseDto })
  update(@Body() dto: UpdateCourseDto) {
    return this.client.send({ role: 'course', cmd: 'update' }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити курс' })
  @ApiParam({ name: 'id', type: String })
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'course', cmd: 'delete' }, id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати курс за ID' })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'course', cmd: 'getById' }, { courseId: id });
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всі курси' })
  getAll() {
    return this.client.send({ role: 'course', cmd: 'getAll' }, {});
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ summary: 'Отримати курси за викладачем' })
  @ApiParam({ name: 'teacherId', type: String })
  getByTeacher(@Param('teacherId') teacherId: string) {
    return this.client.send({ role: 'course', cmd: 'getByTeacher' }, { teacherId });
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Отримати курси за студентом' })
  @ApiParam({ name: 'studentId', type: String })
  getByStudent(@Param('studentId') studentId: string) {
    return this.client.send({ role: 'course', cmd: 'getByStudent' }, { studentId });
  }

  @Post('enroll')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Зарахувати студента' })
  @ApiBody({ type: EnrollStudentDto })
  enroll(@Body() dto: EnrollStudentDto) {
    return this.client.send({ role: 'course', cmd: 'enroll' }, dto);
  }

  @Post('unenroll')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: 'Відрахувати студента' })
  @ApiBody({ type: UnenrollStudentDto })
  unenroll(@Body() dto: UnenrollStudentDto) {
    return this.client.send({ role: 'course', cmd: 'unenroll' }, dto);
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Отримати список студентів на курсі' })
  @ApiParam({ name: 'id', type: String })
  getEnrolledStudents(@Param('id') courseId: string) {
    return this.client.send({ role: 'course', cmd: 'getEnrolledStudents' }, { courseId });
  }

  @Get(':id/details')
  @ApiOperation({ summary: 'Отримати курс з деталями' })
  @ApiParam({ name: 'id', type: String })
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
  @ApiOperation({ summary: 'Оновити порядок контенту в курсі' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: [ContentOrderItem] })
  updateContentOrder(@Param('id') courseId: string, @Body() body: ContentOrderItem[]) {
    return this.client.send(
      { role: 'course', cmd: 'updateContentOrder' },
      { courseId, updates: body },
    );
  }
}
