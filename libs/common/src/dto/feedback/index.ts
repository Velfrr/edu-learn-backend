import { FeedbackType, FeedbackStatus } from '@shared/common/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEnum(FeedbackType)
  type: FeedbackType;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateFeedbackStatusDto {
  @IsString()
  @IsNotEmpty()
  feedbackId: string;

  @IsEnum(FeedbackStatus)
  status: FeedbackStatus;
}

export class GetFeedbackListDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GetFeedbackByIdDto {
  @IsString()
  @IsNotEmpty()
  feedbackId: string;
}
