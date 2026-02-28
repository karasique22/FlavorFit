import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { getJwtConfig } from 'src/config/jwt.config'
import { EmailModule } from 'src/email/email.module'
import { UsersModule } from 'src/users/users.module'

import { AuthAccountService } from './services/auth-account.service'
import { AuthCookieService } from './services/auth-cookie.service'
import { AuthService } from './services/auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UsersModule,
		EmailModule,
		PassportModule.register({ defaultStrategy: 'jwt' })
	],
	providers: [AuthService, AuthAccountService, AuthCookieService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
