import { Request, Response } from 'express';

export interface RequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}

export interface GraphQLContext {
  req: RequestWithCookies;
  res: Response;
}
