import { FeedbackType, FeedbackStatus } from '@shared/common/enums';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'App crashes on login' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ enum: FeedbackType })
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @ApiProperty({ example: 'Every time I try to login, the app crashes.' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateFeedbackStatusDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  feedbackId: string;

  @ApiProperty({ enum: FeedbackStatus })
  @IsEnum(FeedbackStatus)
  status: FeedbackStatus;
}

export class GetFeedbackListDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GetFeedbackByIdDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  feedbackId: string;
}
