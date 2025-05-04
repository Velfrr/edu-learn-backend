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

export class QuestionDto {
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  question: string;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsArray()
  correctAnswers: string[];

  @IsInt()
  points: number;

  @IsInt()
  questionOrder: number;
}

export class CreateTestDto {
  @IsUUID()
  courseId: string;

  @IsString()
  title: string;

  @IsInt()
  minPassPercentage: number;

  @IsInt()
  testOrder: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}

export class UpdateTestDto {
  @IsUUID()
  testId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  minPassPercentage?: number;

  @IsOptional()
  @IsInt()
  testOrder?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions?: QuestionDto[];
}

export class GetTestByIdDto {
  @IsUUID()
  testId: string;
}

export class GetTestsByCourseDto {
  @IsUUID()
  courseId: string;
}

export class SubmitAttemptDto {
  @IsUUID()
  testId: string;

  @IsUUID()
  userId: string;

  @IsArray()
  answers: {
    questionId: string;
    answers: string[];
  }[];
}

export class GetTestAttemptsDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  testId?: string;
}

export class HasPassedTestDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  testId: string;
}
