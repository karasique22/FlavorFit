import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { EmailService } from 'src/email/email.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { generateToken } from 'src/utils/generate-token.util'

import type { AuthTokenData } from '../auth.types'
import { AuthInput } from '../inputs/auth.input'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwt: JwtService,
		private readonly usersService: UsersService,
		private readonly emailService: EmailService
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

		const emailVerificationToken = generateToken()

		const user = await this.usersService.create(
			email,
			await hash(input.password),
			emailVerificationToken,
			new Date(Date.now() + 60 * 60 * 1000) /* 1 hour */
		)

		const tokens = this.generateTokens({
			id: user.id,
			role: user.role
		})

		const verificationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${emailVerificationToken}`

		await this.emailService.sendVerificationEmail(user.email, verificationUrl)

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

	generateTokens(data: AuthTokenData) {
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
}
