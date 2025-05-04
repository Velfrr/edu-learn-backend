import { Injectable } from '@nestjs/common';
import {
  CompleteLessonDto,
  CreateLessonDto,
  GetCourseCompletionsDto,
  GetLessonStatusDto,
  UpdateLessonDto,
} from '@shared/common';
import { DatabaseService } from '@shared/database';
import { LessonCompletion } from '@shared/database/entities/lesson-completion.entity';
import { Lesson } from '@shared/database/entities/lesson.entity';
import { In } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const now = new Date();
    const lesson = this.db.create(Lesson, {
      courseId: dto.courseId,
      title: dto.title,
      content: dto.content,
      lessonOrder: dto.lessonOrder,
      createdAt: now,
      updatedAt: now,
    });
    return this.db.save(lesson);
  }

  async update(dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.db.findOneByOrFail(Lesson, { id: dto.lessonId });
    if (dto.title !== undefined) lesson.title = dto.title;
    if (dto.content !== undefined) lesson.content = dto.content;
    if (dto.lessonOrder !== undefined) lesson.lessonOrder = dto.lessonOrder;
    lesson.updatedAt = new Date();
    return this.db.save(lesson);
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(Lesson, { id });
  }

  async getById(id: string): Promise<Lesson> {
    return this.db.findOneByOrFail(Lesson, { id });
  }

  async getByCourse(courseId: string): Promise<Lesson[]> {
    return this.db.find(Lesson, {
      where: { courseId },
      order: { lessonOrder: 'ASC' },
    });
  }

  async completeLesson(dto: CompleteLessonDto): Promise<LessonCompletion> {
    const existing = await this.db.findOne(LessonCompletion, {
      where: { lessonId: dto.lessonId, userId: dto.userId },
    });

    if (existing) return existing;

    const newCompletion = this.db.create(LessonCompletion, {
      lessonId: dto.lessonId,
      userId: dto.userId,
      completedAt: new Date(),
    });

    return this.db.save(newCompletion);
  }

  async getCompletionStatus(
    dto: GetLessonStatusDto,
  ): Promise<{ isCompleted: boolean; completedAt?: Date }> {
    const completion = await this.db.findOne(LessonCompletion, {
      where: { lessonId: dto.lessonId, userId: dto.userId },
    });

    return {
      isCompleted: !!completion,
      completedAt: completion?.completedAt,
    };
  }

  async getCompletionsByCourse(dto: GetCourseCompletionsDto): Promise<Record<string, boolean>> {
    const lessons = await this.db.find(Lesson, { where: { courseId: dto.courseId } });

    if (!lessons.length) return {};

    const completions = await this.db.find(LessonCompletion, {
      where: {
        userId: dto.userId,
        lessonId: In(lessons.map((l) => l.id)),
      },
    });

    const completedIds = new Set(completions.map((c) => c.lessonId));
    const result: Record<string, boolean> = {};

    for (const lesson of lessons) {
      result[lesson.id] = completedIds.has(lesson.id);
    }

    return result;
  }
}
