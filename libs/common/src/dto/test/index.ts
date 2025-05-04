import {
  IsUUID,
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@shared/common';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({ enum: QuestionType })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  options?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  correctAnswers: string[];

  @ApiProperty()
  @IsInt()
  points: number;

  @ApiProperty()
  @IsInt()
  questionOrder: number;
}

export class CreateTestDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  minPassPercentage: number;

  @ApiProperty()
  @IsInt()
  testOrder: number;

  @ApiProperty({ type: [QuestionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}

export class UpdateTestDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  testId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  minPassPercentage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  testOrder?: number;

  @ApiProperty({ type: [QuestionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}

export class GetTestByIdDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  testId: string;
}

export class GetTestsByCourseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId: string;
}

export class SubmitAttemptDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  testId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        questionId: { type: 'string', format: 'uuid' },
        answers: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @IsArray()
  answers: {
    questionId: string;
    answers: string[];
  }[];
}

export class GetTestAttemptsDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  testId?: string;
}

export class HasPassedTestDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  testId: string;
}
