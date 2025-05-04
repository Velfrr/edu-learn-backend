import {
  Controller,
  UseGuards,
  Inject,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompleteLessonDto, CreateLessonDto, UpdateLessonDto } from '@shared/common';
import { AuthGuard } from '../guard';
import { CurrentUser } from '../decorators';
import { User } from '@shared/database/entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('lessons')
export class LessonController {
  constructor(@Inject('LESSON_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Створити урок' })
  @ApiBody({ type: CreateLessonDto })
  create(@Body() dto: CreateLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'create' }, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Оновити урок' })
  @ApiBody({ type: UpdateLessonDto })
  update(@Body() dto: UpdateLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'update' }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити урок' })
  @ApiParam({ name: 'id', type: String })
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'lesson', cmd: 'delete' }, id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати урок за ID' })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'lesson', cmd: 'getById' }, { lessonId: id });
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Отримати уроки курсу' })
  @ApiParam({ name: 'courseId', type: String })
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'lesson', cmd: 'getByCourse' }, { courseId });
  }

  @Post('complete')
  @ApiOperation({ summary: 'Позначити урок завершеним' })
  @ApiBody({ type: CompleteLessonDto })
  complete(@Body() dto: CompleteLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'complete' }, dto);
  }

  @Get('status/:lessonId')
  @ApiOperation({ summary: 'Статус проходження уроку' })
  @ApiParam({ name: 'lessonId', type: String })
  getStatus(@Param('lessonId') lessonId: string, @CurrentUser() user: User) {
    return this.client.send(
      { role: 'lesson', cmd: 'status' },
      {
        lessonId,
        userId: user.id,
      },
    );
  }

  @Get('course/:courseId/completions')
  @ApiOperation({ summary: 'Отримати завершені уроки курсу' })
  @ApiParam({ name: 'courseId', type: String })
  getCompletions(@Param('courseId') courseId: string, @CurrentUser() user: User) {
    return this.client.send(
      { role: 'lesson', cmd: 'courseCompletions' },
      {
        courseId,
        userId: user.id,
      },
    );
  }
}
