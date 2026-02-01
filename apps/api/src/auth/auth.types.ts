import type { User } from '@repo/database';
import { AuthUser } from './auth.models';

export type AuthTokenData = Pick<User, 'id' | 'role'>;

export type CurrentUser = Omit<AuthUser, 'password'>;

export type RequestWithUser = { user?: CurrentUser };
