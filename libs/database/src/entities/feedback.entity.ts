import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FeedbackStatus, FeedbackType } from '@shared/common';

@Entity({ name: 'feedbacks', schema: 'public' })
export class Feedback {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'text', name: 'subject' })
  subject: string;

  @Column({ type: 'enum', enum: FeedbackType, name: 'type' })
  type: FeedbackType;

  @Column({ type: 'text', name: 'message' })
  message: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    name: 'status',
    default: FeedbackStatus.PENDING,
  })
  status: FeedbackStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.feedbacks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
