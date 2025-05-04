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
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Tests')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tests')
export class TestController {
  constructor(@Inject('TEST_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Створити тест' })
  create(@Body() dto: CreateTestDto) {
    return this.client.send({ role: 'test', cmd: 'create' }, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Оновити тест' })
  update(@Body() dto: UpdateTestDto) {
    return this.client.send({ role: 'test', cmd: 'update' }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити тест' })
  @ApiParam({ name: 'id', type: String })
  delete(@Param('id') id: string) {
    return this.client.send({ role: 'test', cmd: 'delete' }, id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати тест за ID' })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'test', cmd: 'getById' }, { testId: id });
  }

  @Get('/course/:courseId')
  @ApiOperation({ summary: 'Отримати всі тести курсу' })
  @ApiParam({ name: 'courseId', type: String })
  getByCourse(@Param('courseId') courseId: string) {
    return this.client.send({ role: 'test', cmd: 'getByCourse' }, { courseId });
  }

  @Post('/attempt')
  @ApiOperation({ summary: 'Надіслати спробу проходження тесту' })
  submitAttempt(@Body() dto: SubmitAttemptDto) {
    return this.client.send({ role: 'test', cmd: 'submitAttempt' }, dto);
  }

  @Get('/attempts/:userId')
  @ApiOperation({ summary: 'Отримати спроби проходження тесту користувачем' })
  @ApiParam({ name: 'userId', type: String })
  @ApiQuery({ name: 'testId', required: false })
  getAttempts(@Param('userId') userId: string, @Query('testId') testId?: string) {
    return this.client.send({ role: 'test', cmd: 'getAttempts' }, { userId, testId });
  }

  @Get('/has-passed/:testId')
  @ApiOperation({ summary: 'Чи пройшов користувач тест' })
  @ApiParam({ name: 'testId', type: String })
  hasPassed(@Param('testId') testId: string, @CurrentUser() user: User) {
    return this.client.send({ role: 'test', cmd: 'hasPassed' }, { userId: user.id, testId });
  }
}
