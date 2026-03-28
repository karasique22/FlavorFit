import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Throttle } from '@nestjs/throttler'
import { GqlThrottlerGuard } from 'src/common/guards/gql-throttler.guard'

import type { GraphQLContext } from '../common/types/graphql.types'
import { REFRESH_TOKEN_NAME } from './auth.constants'
import { AuthResponse } from './auth.models'
import { VerifyCaptcha } from './decorators/captcha.decorator'
import { AuthInput } from './inputs/auth.input'
import { ResetPasswordInput } from './inputs/reset-password-input'
import { ResetPasswordRequestInput } from './inputs/reset-password-request.input'
import { AuthAccountService } from './services/auth-account.service'
import { AuthCookieService } from './services/auth-cookie.service'
import { AuthService } from './services/auth.service'

@Resolver()
@UseGuards(GqlThrottlerGuard)
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly authAccountService: AuthAccountService,
		private readonly authCookieService: AuthCookieService
	) {}

	@Throttle({ default: { ttl: 60000, limit: 5 } })
	@VerifyCaptcha()
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

		this.authCookieService.setAuthCookies(res, { accessToken, refreshToken })

		return response
	}

	@Throttle({ default: { ttl: 60000, limit: 15 } })
	@VerifyCaptcha()
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

		this.authCookieService.setAuthCookies(res, { accessToken, refreshToken })

		return response
	}

	@Mutation(() => AuthResponse, {
		name: 'refreshTokens',
		description: 'Refresh access and refresh tokens using refresh token cookie'
	})
	async getNewTokens(@Context() { req, res }: GraphQLContext) {
		const initRefreshToken = req.cookies[REFRESH_TOKEN_NAME]

		if (!initRefreshToken) {
			this.authCookieService.setAuthCookies(res, null)
			throw new BadRequestException('No refresh token provided')
		}

		const { refreshToken, accessToken, ...response } =
			await this.authService.getNewTokens(initRefreshToken)

		this.authCookieService.setAuthCookies(res, { accessToken, refreshToken })

		return { accessToken, ...response }
	}

	@Mutation(() => Boolean, {
		name: 'verifyEmail',
		description: 'Verify user email using the token sent to their email'
	})
	async verifyEmail(@Args('token', { type: () => String }) token: string) {
		return this.authAccountService.verifyEmail(token)
	}

	@Mutation(() => Boolean, {
		name: 'requestPasswordReset',
		description: 'Request a password reset email with a reset token'
	})
	async requestPasswordReset(@Args('data') input: ResetPasswordRequestInput) {
		return this.authAccountService.requestPasswordReset(input.email)
	}

	@Mutation(() => Boolean, {
		name: 'resetPassword',
		description: 'Reset user password using the token sent to their email'
	})
	async resetPassword(@Args('data') input: ResetPasswordInput) {
		return this.authAccountService.resetPassword(input.token, input.newPassword)
	}

	@Mutation(() => Boolean, {
		name: 'logout',
		description: 'Logout user and clear refresh token cookie'
	})
	logout(@Context() { res }: GraphQLContext) {
		this.authCookieService.setAuthCookies(res, null)
		return true
	}
}
