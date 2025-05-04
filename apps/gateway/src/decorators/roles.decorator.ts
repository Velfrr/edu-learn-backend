import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@shared/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
