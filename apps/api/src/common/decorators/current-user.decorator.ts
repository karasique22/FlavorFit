import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CurrentUser as CurrentUserType, RequestWithUser } from '../../auth/auth.types';

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType | undefined, ctx: ExecutionContext) => {
    let user: CurrentUserType | null | undefined = null;

    if (ctx.getType() === 'http') {
      user = ctx.switchToHttp().getRequest<RequestWithUser>().user;
    } else {
      const context = GqlExecutionContext.create(ctx);
      user = context.getContext<{ req: RequestWithUser }>().req.user;
    }

    if (!user) return null;

    return data ? user[data] : user;
  },
);
