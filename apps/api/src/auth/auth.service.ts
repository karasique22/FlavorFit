import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { Response } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { isDev } from 'src/utils/is-dev.util'

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from './auth.constants'
import { AuthInput } from './auth.input'
import type { AuthTokenData } from './auth.types'

const MS_PER_HOUR = 60 * 60 * 1000
const MS_PER_DAY = 24 * MS_PER_HOUR

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwt: JwtService,
		private readonly usersService: UsersService
	) {}

	private readonly EXPIRE_HOURS_ACCESS = 1
	private readonly EXPIRE_DAYS_REFRESH = 3

	async register(input: AuthInput) {
		const email = input.email.toLowerCase()
		const existingUser = await this.prisma.user.findUnique({
			where: { email }
		})

		if (existingUser) {
			throw new BadRequestException('Email already in use')
		}

		const user = await this.usersService.create(
			email,
			await hash(input.password)
		)

		const tokens = this.generateTokens({
			id: user.id,
			role: user.role
		})

		return { user, ...tokens }
	}

	async login(input: AuthInput) {
		const user = await this.validateUser(input)

		const tokens = this.generateTokens({
			id: user.id,
			role: user.role
		})

		return { user, ...tokens }
	}

	async getNewTokens(refreshToken: string) {
		const result =
			await this.jwt.verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken)
		if (!result) throw new BadRequestException('Invalid refresh token')

		const user = await this.usersService.findOne(result.id)
		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		const tokens = this.generateTokens({
			id: user.id,
			role: user.role
		})

		return { user, ...tokens }
	}

	private async validateUser(input: AuthInput) {
		const email = input.email.toLowerCase()
		const user = await this.usersService.findUserByEmail(email)

		if (!user) {
			throw new UnauthorizedException('Invalid email or password')
		}

		const isPasswordValid = await verify(user.password, input.password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid email or password')
		}

		return user
	}

	private generateTokens(data: AuthTokenData) {
		const accessToken = this.jwt.sign(data, {
			expiresIn: `${this.EXPIRE_HOURS_ACCESS}h`
		})

		const refreshToken = this.jwt.sign(
			{ id: data.id },
			{
				expiresIn: `${this.EXPIRE_DAYS_REFRESH}d`
			}
		)

		return { accessToken, refreshToken }
	}

	setAuthCookies(
		res: Response,
		tokens: { accessToken: string; refreshToken: string } | null
	) {
		this.writeCookie(res, {
			cookieName: ACCESS_TOKEN_NAME,
			token: tokens?.accessToken || null,
			expires: new Date(Date.now() + this.EXPIRE_HOURS_ACCESS * MS_PER_HOUR)
		})

		this.writeCookie(res, {
			cookieName: REFRESH_TOKEN_NAME,
			token: tokens?.refreshToken || null,
			expires: new Date(Date.now() + this.EXPIRE_DAYS_REFRESH * MS_PER_DAY)
		})
	}

	private writeCookie(
		res: Response,
		{
			cookieName,
			token,
			expires
		}: {
			cookieName:
				| typeof ACCESS_TOKEN_NAME
				| typeof REFRESH_TOKEN_NAME
			token: string | null
			expires: Date
		}
	) {
		if (token) {
			res.cookie(cookieName, token, {
				httpOnly: true,
				expires,
				sameSite: isDev(this.configService) ? 'none' : 'strict',
				secure: true
			})
		} else {
			res.clearCookie(cookieName)
		}
	}
}
