import type { User } from '@repo/database'

export type AuthTokenData = Pick<User, 'id' | 'role'>

export type CurrentUser = Pick<User, 'id' | 'email' | 'role'>

export type RequestWithUser = { user?: CurrentUser }
