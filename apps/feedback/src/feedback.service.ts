import { Injectable } from '@nestjs/common';
import {
  UpdateFeedbackStatusDto,
  FeedbackStatus,
  CreateFeedbackDto,
  GetFeedbackByIdDto,
  GetFeedbackListDto,
} from '@shared/common';
import { DatabaseService } from '@shared/database';
import { Feedback } from '@shared/database/entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.db.create(Feedback, {
      userId: dto.userId,
      subject: dto.subject,
      type: dto.type,
      message: dto.message,
      status: FeedbackStatus.PENDING,
    });

    return this.db.save(feedback);
  }

  async updateStatus(dto: UpdateFeedbackStatusDto): Promise<Feedback> {
    const feedback = await this.db.findOneByOrFail(Feedback, { id: dto.feedbackId });
    feedback.status = dto.status;
    feedback.updatedAt = new Date();
    return this.db.save(feedback);
  }

  getAll(params: GetFeedbackListDto): Promise<Feedback[]> {
    return this.db.find(Feedback, {
      where: params.userId ? { userId: params.userId } : undefined,
      order: { createdAt: 'DESC' },
    });
  }

  getById(params: GetFeedbackByIdDto): Promise<Feedback> {
    return this.db.findOneByOrFail(Feedback, { id: params.feedbackId });
  }
}
