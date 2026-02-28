import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ThrottlerModule } from '@nestjs/throttler'
import { TurnstileModule } from 'nest-cloudflare-turnstile'
import { ResendModule } from 'nestjs-resend'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { registerGraphQLEnums } from './common/graphql-enums'
import { getGraphQLConfig } from './config/graphql.config'
import { getTurnstileConfig } from './config/turnstile.config'
import { EmailModule } from './email/email.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'
import { RecipesModule } from './recipes/recipes.module'
import { UsersModule } from './users/users.module'

registerGraphQLEnums()

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '../../.env'
		}),
		ThrottlerModule.forRoot({
			throttlers: [{ ttl: 60000, limit: 10 }]
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getGraphQLConfig
		}),
		TurnstileModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTurnstileConfig
		}),
		ResendModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				apiKey: configService.getOrThrow<string>('RESEND_API_KEY') || ''
			})
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		RecipesModule,
		OrdersModule,
		EmailModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
