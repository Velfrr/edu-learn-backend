import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { TestAttempt } from './test-attempt.entity';
import { Question } from './question.entity';

@Entity({ name: 'tests', schema: 'public' })
export class Test {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'course_id' })
  courseId: string;

  @ManyToOne(() => Course, (course) => course.tests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'integer', name: 'min_pass_percentage' })
  minPassPercentage: number;

  @Column({ type: 'integer', name: 'content_order' })
  contentOrder: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TestAttempt, (attempt) => attempt.test)
  testAttempts: TestAttempt[];

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];
}
