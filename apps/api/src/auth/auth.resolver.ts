import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'
import { GqlThrottlerGuard } from 'src/common/guards/gql-throttler.guard'

import type { GraphQLContext } from '../common/types/graphql.types'
import { REFRESH_TOKEN_NAME } from './auth.constants'
import { AuthInput } from './auth.input'
import { AuthResponse } from './auth.models'
import { AuthService } from './auth.service'

@Resolver()
@UseGuards(GqlThrottlerGuard)
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Throttle({ default: { ttl: 60000, limit: 5 } })
	@Mutation(() => AuthResponse, {
		name: 'register',
		description: 'Register a new user account'
	})
	async register(
		@Args('data') input: AuthInput,
		@Context() { res }: GraphQLContext
	) {
		const { accessToken, refreshToken, ...response } =
			await this.authService.register(input)

		this.authService.setAuthCookies(res, { accessToken, refreshToken })

		return response
	}

	@Throttle({ default: { ttl: 60000, limit: 5 } })
	@Mutation(() => AuthResponse, {
		name: 'login',
		description: 'Authenticate user and return tokens'
	})
	async login(
		@Args('data') input: AuthInput,
		@Context() { res }: GraphQLContext
	) {
		const { accessToken, refreshToken, ...response } =
			await this.authService.login(input)

		this.authService.setAuthCookies(res, { accessToken, refreshToken })

		return response
	}

	@Mutation(() => AuthResponse, {
		name: 'refreshTokens',
		description: 'Refresh access and refresh tokens using refresh token cookie'
	})
	async getNewTokens(@Context() { req, res }: GraphQLContext) {
		const initRefreshToken = req.cookies[REFRESH_TOKEN_NAME]

		if (!initRefreshToken) {
			this.authService.setAuthCookies(res, null)
			throw new BadRequestException('No refresh token provided')
		}

		const { refreshToken, accessToken, ...response } =
			await this.authService.getNewTokens(initRefreshToken)

		this.authService.setAuthCookies(res, { accessToken, refreshToken })

		return response
	}

	@Mutation(() => Boolean, {
		name: 'logout',
		description: 'Logout user and clear refresh token cookie'
	})
	logout(@Context() { res }: GraphQLContext) {
		this.authService.setAuthCookies(res, null)
		return true
	}
}
