import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Test } from './test.entity';
import { QuestionType } from '@shared/common';
import { QuestionAnswer } from './question-answer.entity';

@Entity({ name: 'questions', schema: 'public' })
export class Question {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'uuid', name: 'test_id' })
  testId: string;

  @ManyToOne(() => Test, (test) => test.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @Column({ type: 'enum', enum: QuestionType, name: 'type' })
  type: QuestionType;

  @Column({ type: 'text', name: 'question' })
  question: string;

  @Column({ type: 'jsonb', name: 'options', nullable: true })
  options?: string[];

  @Column({ type: 'jsonb', name: 'correct_answers' })
  correctAnswers: string[];

  @Column({ type: 'integer', name: 'points', default: 1 })
  points: number;

  @Column({ type: 'integer', name: 'question_order' })
  questionOrder: number;

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.question)
  questionAnswers: QuestionAnswer[];
}
