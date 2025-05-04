import { Controller } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateFeedbackDto,
  UpdateFeedbackStatusDto,
  GetFeedbackByIdDto,
  GetFeedbackListDto,
} from '@shared/common';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @MessagePattern({ role: 'feedback', cmd: 'submit' })
  create(@Payload() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @MessagePattern({ role: 'feedback', cmd: 'update-status' })
  update(@Payload() dto: UpdateFeedbackStatusDto) {
    return this.feedbackService.updateStatus(dto);
  }

  @MessagePattern({ role: 'feedback', cmd: 'get-all' })
  getAll(@Payload() dto: GetFeedbackListDto) {
    return this.feedbackService.getAll(dto);
  }

  @MessagePattern({ role: 'feedback', cmd: 'get-by-id' })
  getById(@Payload() dto: GetFeedbackByIdDto) {
    return this.feedbackService.getById(dto);
  }
}
