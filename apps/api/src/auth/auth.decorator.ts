import { applyDecorators, Type, UseGuards } from '@nestjs/common';
import { Role } from '@repo/database';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';

export const Auth = (role?: Role) => {
  const guards: Array<Type<any>> = [GqlAuthGuard];

  if (role === Role.ADMIN) {
    guards.push(AdminGuard);
  }

  return applyDecorators(UseGuards(...guards));
};
