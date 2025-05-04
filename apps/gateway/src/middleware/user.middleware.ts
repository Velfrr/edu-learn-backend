import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { DatabaseService } from '@shared/database';
import { User } from '@shared/database/entities/user.entity';
import { CustomRequest } from '@shared/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly db: DatabaseService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
      try {
        const payload = verify(token, process.env.JWT_SECRET!) as { userId: string };

        const user = await this.db.findOne(User, {
          where: { id: payload.userId },
        });

        if (user) {
          req.user = user;
        }
      } catch {
        /* empty */
      }
    }

    next();
  }
}
