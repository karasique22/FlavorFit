import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma/prisma.service'

import { User } from '@repo/database'

import { ACCESS_TOKEN_NAME } from '../auth.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prisma: PrismaService,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => (req.cookies?.[ACCESS_TOKEN_NAME] as string) || null
			]),
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET')
		})
	}

	validate({ id }: { id: string }): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				profile: { include: { bodyMeasurements: true } }
			}
		})
	}
}
