import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database';
import { CourseEnrollment } from '@shared/database/entities/course-enrollment.entity';
import { Course } from '@shared/database/entities/course.entity';
import { LessonCompletion } from '@shared/database/entities/lesson-completion.entity';
import { Lesson } from '@shared/database/entities/lesson.entity';
import { TestAttempt } from '@shared/database/entities/test-attempt.entity';
import { User } from '@shared/database/entities/user.entity';
import { In } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(private readonly db: DatabaseService) {}

  async getStudentsByCourse(courseId: string) {
    const enrollments = await this.db.find(CourseEnrollment, {
      where: { courseId },
    });

    const userIds = enrollments.map((e) => e.userId);

    const users = await this.db.find(User, {
      where: { id: In(userIds) },
      select: ['id', 'fullName', 'role', 'createdAt', 'lastActive'],
    });

    return users;
  }

  async getStudentProgress(courseId: string, studentId: string) {
    const lessons = await this.db.find(Lesson, { where: { courseId } });

    const completions = await this.db.find(LessonCompletion, {
      where: {
        userId: studentId,
        lessonId: In(lessons.map((l) => l.id)),
      },
    });

    const attempts = await this.db.find(TestAttempt, {
      where: { userId: studentId },
      relations: ['test'],
    });

    const filteredAttempts = attempts.filter((a) => a.test.courseId === courseId);

    return {
      lessonCompletions: completions,
      testAttempts: filteredAttempts,
    };
  }

  async getTeacherStudents(teacherId: string) {
    const courses = await this.db.find(Course, {
      where: { createdById: teacherId },
    });

    const enrollments = await this.db.find(CourseEnrollment, {
      where: { courseId: In(courses.map((c) => c.id)) },
    });

    const grouped = enrollments.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.userId] = (acc[curr.userId] || 0) + 1;
      return acc;
    }, {});

    const userIds = Object.keys(grouped);

    const users = await this.db.find(User, {
      where: { id: In(userIds) },
      select: ['id', 'fullName', 'role', 'createdAt', 'lastActive'],
    });

    return users.map((u) => ({
      user: u,
      enrolledCourses: grouped[u.id],
    }));
  }

  async unenrollStudent(courseId: string, studentId: string) {
    await this.db.delete(CourseEnrollment, {
      courseId,
      userId: studentId,
    });
  }
}
