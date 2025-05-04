import { User } from '@shared/database/entities/user.entity';
import { Request } from 'express';

export type CustomRequest = Request & {
  user: User;
};
