import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../auth.types';

export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): RequestWithUser {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: RequestWithUser }>().req;
  }
}
