import { CourseEnrollment } from './course-enrollment.entity';
import { Course } from './course.entity';
import { Feedback } from './feedback.entity';
import { LessonCompletion } from './lesson-completion.entity';
import { Lesson } from './lesson.entity';
import { QuestionAnswer } from './question-answer.entity';
import { Question } from './question.entity';
import { TestAttempt } from './test-attempt.entity';
import { Test } from './test.entity';
import { User } from './user.entity';

export const entities = [
  Course,
  CourseEnrollment,
  Lesson,
  LessonCompletion,
  User,
  TestAttempt,
  Feedback,
  Test,
  Feedback,
  Question,
  QuestionAnswer,
];
