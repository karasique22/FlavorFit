import type { User } from '@repo/database';
import { AuthUser } from './auth.models';

export type TAuthTokenData = Pick<User, 'id' | 'role'>;

export type TCurrentUser = Omit<AuthUser, 'password'>;

export type TRequestWithUser = { user?: TCurrentUser };
