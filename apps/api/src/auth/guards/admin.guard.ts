import { ForbiddenError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@repo/database';
import { RequestWithUser } from '../auth.types';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<{ req: RequestWithUser }>().req.user;

    if (!user || user.role !== Role.ADMIN) {
      throw new ForbiddenError('Access denied');
    }
    return true;
  }
}
