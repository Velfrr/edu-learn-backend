import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database';
import { In } from 'typeorm';
import { Course } from '@shared/database/entities/course.entity';
import { CourseEnrollment } from '@shared/database/entities/course-enrollment.entity';
import { LessonCompletion } from '@shared/database/entities/lesson-completion.entity';
import { Lesson } from '@shared/database/entities/lesson.entity';
import { TestAttempt } from '@shared/database/entities/test-attempt.entity';
import { Test } from '@shared/database/entities/test.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: DatabaseService) {}

  async getCourseAnalytics(teacherId: string) {
    const courses = await this.db.find(Course, {
      where: { createdById: teacherId },
      select: ['id', 'title'],
    });

    const courseIds = courses.map((c) => c.id);

    const enrollments = await this.db.find(CourseEnrollment, {
      where: { courseId: In(courseIds) },
    });

    const lessons = await this.db.find(Lesson, {
      where: { courseId: In(courseIds) },
    });

    const completions = await this.db.find(LessonCompletion, {
      where: {
        lessonId: In(lessons.map((l) => l.id)),
      },
    });

    const tests = await this.db.find(Test, {
      where: { courseId: In(courseIds) },
    });

    const attempts = await this.db.find(TestAttempt, {
      where: {
        testId: In(tests.map((t) => t.id)),
      },
    });

    const enrollmentsMap = new Map<string, number>();
    for (const course of courses) {
      enrollmentsMap.set(course.id, enrollments.filter((e) => e.courseId === course.id).length);
    }

    const enrollmentData = courses.map((course) => ({
      courseName: course.title,
      enrollments: enrollmentsMap.get(course.id) || 0,
    }));

    const completionData = courses.map((course) => {
      const courseLessonIds = lessons.filter((l) => l.courseId === course.id).map((l) => l.id);

      const completedLessons = completions.filter((lc) => courseLessonIds.includes(lc.lessonId));

      const enrollmentCount = enrollmentsMap.get(course.id) || 0;
      const rate = enrollmentCount > 0 ? (completedLessons.length / enrollmentCount) * 100 : 0;

      return {
        courseId: course.id,
        courseName: course.title,
        completionRate: rate,
      };
    });

    const lessonPerformance = lessons.map((lesson) => {
      const completionCount = completions.filter((lc) => lc.lessonId === lesson.id).length;

      const completionRate =
        enrollments.length > 0 ? (completionCount / enrollments.length) * 100 : 0;

      const relatedTests = tests.filter((t) => t.courseId === lesson.courseId);
      const relatedTestIds = relatedTests.map((t) => t.id);

      const relatedAttempts = attempts.filter((ta) => relatedTestIds.includes(ta.testId));

      const averageScore =
        relatedAttempts.length > 0
          ? relatedAttempts.reduce((acc, curr) => acc + (curr.score / curr.maxScore) * 100, 0) /
            relatedAttempts.length
          : 0;

      return {
        lessonName: lesson.title,
        completionRate,
        averageScore,
      };
    });

    return {
      enrollments: enrollmentData,
      completions: completionData,
      lessonPerformance,
    };
  }
}
