import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard';
import { CurrentUser, Roles } from '../decorators';
import { User } from '@shared/database/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFeedbackDto, UpdateFeedbackStatusDto, UserRole } from '@shared/common';

@Controller('feedback')
@UseGuards(AuthGuard)
export class FeedbackController {
  constructor(@Inject('FEEDBACK_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto, @CurrentUser() user: User) {
    return this.client.send({ role: 'feedback', cmd: 'submit' }, { ...dto, userId: user.id });
  }

  @Patch('status')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  updateStatus(@Body() dto: UpdateFeedbackStatusDto) {
    return this.client.send({ role: 'feedback', cmd: 'update-status' }, dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  getAll() {
    return this.client.send({ role: 'feedback', cmd: 'get-all' }, {});
  }

  @Get('my')
  getMy(@CurrentUser() user: User) {
    return this.client.send({ role: 'feedback', cmd: 'get-by-user' }, { userId: user.id });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  getById(@Param('id') id: string) {
    return this.client.send({ role: 'feedback', cmd: 'get-by-id' }, { feedbackId: id });
  }
}
