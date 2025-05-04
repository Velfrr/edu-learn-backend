// apps/gateway/src/controllers/test.controller.ts

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
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTestDto, UpdateTestDto, SubmitAttemptDto } from '@shared/common';
import { CurrentUser } from '../decorators';
import { AuthGuard } from '../guard';
import { User } from '@shared/database/entities/user.entity';

@Controller('tests')
@UseGuards(AuthGuard)
export class TestController {
  constructor(@Inject('TEST_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() dto: CreateTestDto) {
    return this.client.send({ role: 'test', cmd: 'create' }, dto);
  }

  @Patch()
  update(@Body() dto: UpdateTestDto) {
    return this.client.send({ role: 'test', cmd: 'update' }, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'test', cmd: 'delete' }, id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'test', cmd: 'getById' }, { testId: id });
  }

  @Get('/course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'test', cmd: 'getByCourse' }, { courseId });
  }

  @Post('/attempt')
  submitAttempt(@Body() dto: SubmitAttemptDto) {
    return this.client.send({ role: 'test', cmd: 'submitAttempt' }, dto);
  }

  @Get('/attempts/:userId')
  getAttempts(@Param('userId') userId: string, @Query('testId') testId?: string) {
    return this.client.send({ role: 'test', cmd: 'getAttempts' }, { userId, testId });
  }

  @Get('/has-passed/:testId')
  hasPassed(@Param('testId') testId: string, @CurrentUser() user: User) {
    return this.client.send({ role: 'test', cmd: 'hasPassed' }, { userId: user.id, testId });
  }
}
