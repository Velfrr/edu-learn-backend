import { Injectable } from '@nestjs/common';
import {
  CreateTestDto,
  UpdateTestDto,
  SubmitAttemptDto,
  QuestionType,
  GetTestAttemptsDto,
  HasPassedTestDto,
} from '@shared/common';
import { DatabaseService } from '@shared/database';
import { QuestionAnswer } from '@shared/database/entities/question-answer.entity';
import { Question } from '@shared/database/entities/question.entity';
import { TestAttempt } from '@shared/database/entities/test-attempt.entity';
import { Test } from '@shared/database/entities/test.entity';

@Injectable()
export class TestService {
  constructor(private readonly db: DatabaseService) {}

  async createTest(dto: CreateTestDto): Promise<Test> {
    const test = this.db.create(Test, {
      courseId: dto.courseId,
      title: dto.title,
      minPassPercentage: dto.minPassPercentage,
      contentOrder: dto.testOrder,
    });

    const saved = await this.db.save(test);

    if (dto.questions?.length) {
      const questions = dto.questions.map((q) =>
        this.db.create(Question, {
          testId: saved.id,
          ...q,
        }),
      );
      await this.db.save(questions);
      saved.questions = questions;
    }

    return saved;
  }

  async updateTest(dto: UpdateTestDto): Promise<Test> {
    const test = await this.db.findOneByOrFail(Test, { id: dto.testId });

    Object.assign(test, {
      ...dto,
      updatedAt: new Date(),
    });

    if (dto.questions) {
      await this.db.delete(Question, { testId: dto.testId });

      const newQuestions = dto.questions.map((q) =>
        this.db.create(Question, {
          testId: test.id,
          ...q,
        }),
      );
      await this.db.save(newQuestions);
      test.questions = newQuestions;
    }

    return this.db.save(test);
  }

  async deleteTest(testId: string): Promise<void> {
    await this.db.delete(Test, { id: testId });
  }

  async getTestById(testId: string): Promise<Test> {
    return this.db.findOneOrFail(Test, {
      where: { id: testId },
      relations: { questions: true },
    });
  }

  async getTestsByCourse(courseId: string): Promise<Test[]> {
    return this.db.find(Test, {
      where: { courseId },
      order: { contentOrder: 'ASC' },
      relations: { questions: true },
    });
  }

  async submitAttempt(dto: SubmitAttemptDto): Promise<TestAttempt> {
    const existing = await this.db.findOne(TestAttempt, {
      where: {
        testId: dto.testId,
        userId: dto.userId,
        isPassed: true,
      },
    });

    if (existing) throw new Error('You have already passed this test');

    const test = await this.getTestById(dto.testId);
    const maxScore = test.questions.reduce((s, q) => s + q.points, 0);
    let score = 0;

    const answers = dto.answers.map((a) => {
      const q = test.questions.find((q) => q.id === a.questionId);
      if (!q) return;

      let isCorrect = false;

      switch (q.type) {
        case QuestionType.MULTIPLE_CHOICE:
          isCorrect =
            a.answers.length === q.correctAnswers.length &&
            a.answers.every((ans) => q.correctAnswers.includes(ans));
          break;
        case QuestionType.SINGLE_CHOICE:
        case QuestionType.CORRECT_INCORRECT:
        case QuestionType.TEXT_MATCH:
          isCorrect = a.answers[0].toLowerCase() === q.correctAnswers[0].toLowerCase();
          break;
      }

      const earned = isCorrect ? q.points : 0;
      score += earned;

      return this.db.create(QuestionAnswer, {
        questionId: q.id,
        answers: a.answers,
        isCorrect,
        pointsEarned: earned,
      });
    });

    const attempt = this.db.create(TestAttempt, {
      testId: dto.testId,
      userId: dto.userId,
      score,
      maxScore,
      isPassed: (score / maxScore) * 100 >= test.minPassPercentage,
    });

    const savedAttempt = await this.db.save(attempt);

    for (const a of answers.filter(Boolean) as QuestionAnswer[]) {
      a.testAttemptId = savedAttempt.id;
    }

    await this.db.save(answers);
    return savedAttempt;
  }

  async getAttemptsByUser(dto: GetTestAttemptsDto): Promise<TestAttempt[]> {
    return this.db.find(TestAttempt, {
      where: {
        userId: dto.userId,
        ...(dto.testId && { testId: dto.testId }),
      },
      order: { completedAt: 'DESC' },
    });
  }

  async hasPassedTest(dto: HasPassedTestDto): Promise<boolean> {
    const existing = await this.db.findOne(TestAttempt, {
      where: {
        userId: dto.userId,
        testId: dto.testId,
        isPassed: true,
      },
    });
    return !!existing;
  }
}
