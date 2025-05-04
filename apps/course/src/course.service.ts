import { Injectable } from '@nestjs/common';
import {
  CourseWithDetails,
  CreateCourseDto,
  EnrollStudentDto,
  GetCourseWithDetailsDto,
  UnenrollStudentDto,
  UpdateContentOrderDto,
  UpdateCourseDto,
} from '@shared/common';
import { DatabaseService } from '@shared/database';
import { CourseEnrollment } from '@shared/database/entities/course-enrollment.entity';
import { Course } from '@shared/database/entities/course.entity';
import { LessonCompletion } from '@shared/database/entities/lesson-completion.entity';
import { Lesson } from '@shared/database/entities/lesson.entity';
import { Test } from '@shared/database/entities/test.entity';
import { In } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = this.db.create(Course, {
      title: dto.title,
      description: dto.description,
      imageUrl: dto.imageUrl,
      createdById: dto.createdById,
    });

    return this.db.save(course);
  }

  async update(dto: UpdateCourseDto): Promise<Course> {
    const course = await this.db.findOneByOrFail(Course, { id: dto.courseId });

    course.title = dto.title ?? course.title;
    course.description = dto.description ?? course.description;
    course.imageUrl = dto.imageUrl ?? course.imageUrl;
    course.updatedAt = new Date();

    return this.db.save(course);
  }

  async delete(courseId: string): Promise<void> {
    await this.db.delete(Course, { id: courseId });
  }

  async getById(courseId: string): Promise<Course> {
    return this.db.findOneByOrFail(Course, { id: courseId });
  }

  async getAll(): Promise<Course[]> {
    return this.db.find(Course, {
      order: { createdAt: 'DESC' },
    });
  }

  async getByTeacher(teacherId: string): Promise<Course[]> {
    return this.db.find(Course, {
      where: { createdById: teacherId },
      order: { createdAt: 'DESC' },
    });
  }

  async getByStudent(studentId: string): Promise<Course[]> {
    const enrollments = await this.db.find(CourseEnrollment, {
      where: { userId: studentId },
    });

    const ids = enrollments.map((e) => e.courseId);
    if (!ids.length) return [];

    return this.db.find(Course, {
      where: { id: In(ids) },
      order: { createdAt: 'DESC' },
    });
  }

  async enroll(dto: EnrollStudentDto): Promise<CourseEnrollment> {
    const existing = await this.db.findOne(CourseEnrollment, {
      where: { courseId: dto.courseId, userId: dto.studentId },
    });

    if (existing) return existing;

    const enrollment = this.db.create(CourseEnrollment, {
      courseId: dto.courseId,
      userId: dto.studentId,
      enrolledAt: new Date(),
    });

    return this.db.save(enrollment);
  }

  async unenroll(dto: UnenrollStudentDto): Promise<void> {
    await this.db.delete(CourseEnrollment, {
      courseId: dto.courseId,
      userId: dto.studentId,
    });
  }

  async getEnrolledStudents(courseId: string): Promise<string[]> {
    const enrollments = await this.db.find(CourseEnrollment, {
      where: { courseId },
    });

    return enrollments.map((e) => e.userId);
  }

  async getCourseWithDetails(dto: GetCourseWithDetailsDto): Promise<CourseWithDetails> {
    const course = await this.getById(dto.courseId);
    const lessonCount = await this.db.count(Lesson, { where: { courseId: dto.courseId } });
    const studentCount = await this.db.count(CourseEnrollment, {
      where: { courseId: dto.courseId },
    });

    let completionPercentage: number | undefined;

    if (dto.userId) {
      const lessons = await this.db.find(Lesson, { where: { courseId: dto.courseId } });
      const completions = await this.db.find(LessonCompletion, {
        where: {
          userId: dto.userId,
          lessonId: In(lessons.map((l) => l.id)),
        },
      });

      if (lessons.length > 0) {
        completionPercentage = (completions.length / lessons.length) * 100;
      }
    }

    return {
      ...course,
      lessonCount,
      studentCount,
      completionPercentage,
    };
  }

  async updateContentOrder(dto: UpdateContentOrderDto): Promise<void> {
    const { updates } = dto;

    await Promise.all(
      updates.map((item) => {
        if (item.type === 'LESSON') {
          return this.db.update(Lesson, { id: item.id }, { lessonOrder: item.order });
        }
        if (item.type === 'TEST') {
          return this.db.update(Test, { id: item.id }, { contentOrder: item.order });
        }
      }),
    );
  }
}
