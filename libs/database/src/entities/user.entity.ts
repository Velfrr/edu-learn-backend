import { UserRole } from '@shared/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Feedback } from './feedback.entity';
import { TestAttempt } from './test-attempt.entity';
import { LessonCompletion } from './lesson-completion.entity';
import { CourseEnrollment } from './course-enrollment.entity';
import { Course } from './course.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'text', name: 'email', unique: true })
  email: string;

  @Column({ type: 'text', name: 'password' })
  password: string;

  @Column({ type: 'boolean', name: 'is_banned', default: false })
  isBanned: boolean;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'enum', name: 'role', enum: UserRole })
  role: UserRole;

  @Column({ type: 'timestamptz', name: 'last_active', nullable: true })
  lastActive?: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => TestAttempt, (attempt) => attempt.user)
  testAttempts: TestAttempt[];

  @OneToMany(() => LessonCompletion, (completion) => completion.user)
  lessonCompletions: LessonCompletion[];

  @OneToMany(() => CourseEnrollment, (enrollment) => enrollment.user)
  courseEnrollments: CourseEnrollment[];

  @OneToMany(() => Course, (course) => course.createdBy)
  createdCourses: CourseEnrollment[];
}
