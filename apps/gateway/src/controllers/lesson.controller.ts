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

@Controller('lessons')
@UseGuards(AuthGuard)
export class LessonController {
  constructor(@Inject('LESSON_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'create' }, dto);
  }

  @Patch()
  update(@Body() dto: UpdateLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'update' }, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'lesson', cmd: 'delete' }, id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'lesson', cmd: 'getById' }, { lessonId: id });
  }

  @Get('course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'lesson', cmd: 'getByCourse' }, { courseId });
  }

  @Post('complete')
  complete(@Body() dto: CompleteLessonDto) {
    return this.client.send({ role: 'lesson', cmd: 'complete' }, dto);
  }

  @Get('status/:lessonId')
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
