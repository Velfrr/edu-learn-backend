import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard';
import { CurrentUser, Roles } from '../decorators';
import { User } from '@shared/database/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFeedbackDto, UpdateFeedbackStatusDto, UserRole } from '@shared/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Feedback')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('feedback')
export class FeedbackController {
  constructor(@Inject('FEEDBACK_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Надіслати відгук' })
  @ApiBody({ type: CreateFeedbackDto })
  create(@Body() dto: CreateFeedbackDto, @CurrentUser() user: User) {
    return this.client.send({ role: 'feedback', cmd: 'submit' }, { ...dto, userId: user.id });
  }

  @Patch('status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Оновити статус відгуку' })
  @ApiBody({ type: UpdateFeedbackStatusDto })
  updateStatus(@Body() dto: UpdateFeedbackStatusDto) {
    return this.client.send({ role: 'feedback', cmd: 'update-status' }, dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Отримати всі відгуки' })
  getAll() {
    return this.client.send({ role: 'feedback', cmd: 'get-all' }, {});
  }

  @Get('my')
  @ApiOperation({ summary: 'Отримати свої відгуки' })
  getMy(@CurrentUser() user: User) {
    return this.client.send({ role: 'feedback', cmd: 'get-by-user' }, { userId: user.id });
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Отримати відгук за ID' })
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'feedback', cmd: 'get-by-id' }, { feedbackId: id });
  }
}
