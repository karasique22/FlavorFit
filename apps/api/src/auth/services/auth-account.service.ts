import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash } from 'argon2'
import { EmailService } from 'src/email/email.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'
import { generateToken } from 'src/utils/generate-token.util'

@Injectable()
export class AuthAccountService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly emailService: EmailService
	) {}

	async verifyEmail(token: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				emailVerificationToken: token,
				emailVerificationTokenExpiresAt: {
					gte: new Date()
				}
			}
		})

		if (!user) {
			throw new BadRequestException('Invalid or expired verification token')
		}

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				isEmailVerified: true,
				emailVerificationToken: null,
				emailVerificationTokenExpiresAt: null
			}
		})

		return true
	}

	async requestPasswordReset(email: string) {
		const user = await this.usersService.findUserByEmail(email)

		if (!user) {
			return true
		}

		const resetToken = generateToken()

		await this.prisma.user.update({
			where: { id: user.id },

			data: {
				resetPasswordToken: resetToken,
				resetPasswordTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 min
			}
		})

		const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`

		await this.emailService.sendResetPasswordEmail(user.email, resetUrl)
	}

	async resetPassword(token: string, newPassword: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				resetPasswordToken: token,
				resetPasswordTokenExpiresAt: {
					gte: new Date()
				}
			}
		})

		if (!user) {
			throw new BadRequestException('Invalid or expired reset token')
		}

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				password: await hash(newPassword),
				resetPasswordToken: null,
				resetPasswordTokenExpiresAt: null
			}
		})

		return true
	}
}
