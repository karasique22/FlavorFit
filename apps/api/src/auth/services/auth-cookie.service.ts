import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { isDev } from 'src/utils/is-dev.util'

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../auth.constants'

const MS_PER_HOUR = 60 * 60 * 1000
const MS_PER_DAY = 24 * MS_PER_HOUR

@Injectable()
export class AuthCookieService {
	constructor(private readonly configService: ConfigService) {}

	private readonly EXPIRE_HOURS_ACCESS = 1
	private readonly EXPIRE_DAYS_REFRESH = 3

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
			cookieName: typeof ACCESS_TOKEN_NAME | typeof REFRESH_TOKEN_NAME
			token: string | null
			expires: Date
		}
	) {
		if (token) {
			res.cookie(cookieName, token, {
				httpOnly: true,
				expires,
				sameSite: isDev(this.configService) ? 'lax' : 'strict',
				secure: !isDev(this.configService)
			})
		} else {
			res.clearCookie(cookieName)
		}
	}
}
