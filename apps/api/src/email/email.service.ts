import { Injectable } from '@nestjs/common'
import { render } from '@react-email/components'
import { ResendService } from 'nestjs-resend'

import ResetPasswordEmail from './templates/reset-password'
import VerificationEmail from './templates/verification-email'

@Injectable()
export class EmailService {
	constructor(private readonly resend: ResendService) {}

	private async sendEmail(to: string, subject: string, html: string) {
		return this.resend.emails.send({
			from: '<onboarding@resend.dev>',
			to,
			subject,
			html
		})
	}

	async sendVerificationEmail(to: string, url: string) {
		const html = await render(VerificationEmail({ url }))
		return this.sendEmail(to, 'Подтвердите ваш email адрес', html)
	}
	async sendResetPasswordEmail(to: string, url: string) {
		const html = await render(ResetPasswordEmail({ url }))
		return this.sendEmail(to, 'Сброс пароля вашего аккаунта', html)
	}
}
