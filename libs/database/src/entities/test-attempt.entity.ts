import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Test } from './test.entity';
import { QuestionAnswer } from './question-answer.entity';

@Entity({ name: 'test_attempts', schema: 'public' })
export class TestAttempt {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'test_id' })
  testId: string;

  @ManyToOne(() => Test, (test) => test.testAttempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.testAttempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer', name: 'score' })
  score: number;

  @Column({ type: 'integer', name: 'max_score' })
  maxScore: number;

  @Column({ type: 'boolean', name: 'is_passed' })
  isPassed: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'completed_at' })
  completedAt: Date;

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.testAttempt)
  questionAnswers: QuestionAnswer[];
}
