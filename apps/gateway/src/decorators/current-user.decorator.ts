import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from '@shared/common';
import { User } from '@shared/database/entities/user.entity';

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request: CustomRequest = ctx.switchToHttp().getRequest();
  return request.user;
});
