import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TestAttempt } from './test-attempt.entity';
import { Question } from './question.entity';

@Entity({ name: 'question_answers', schema: 'public' })
export class QuestionAnswer {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'test_attempt_id' })
  testAttemptId: string;

  @ManyToOne(() => TestAttempt, (testAttempt) => testAttempt.questionAnswers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'test_attempt_id' })
  testAttempt: TestAttempt;

  @Column({ type: 'uuid', name: 'question_id' })
  questionId: string;

  @ManyToOne(() => Question, (question) => question.questionAnswers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ type: 'jsonb', name: 'answers' })
  answers: any;

  @Column({ type: 'boolean', name: 'is_correct' })
  isCorrect: boolean;

  @Column({ type: 'integer', name: 'points_earned' })
  pointsEarned: number;
}
