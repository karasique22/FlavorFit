import {
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { TurnstileService } from 'nest-cloudflare-turnstile/dist/services/turnstile.service'
import { GraphQLContext } from 'src/common/types/graphql.types'

@Injectable()
export class GqlTurnstileGuard {
	constructor(
		private readonly turnstileService: TurnstileService,

		@Inject('TurnstileServiceOptions')
		private readonly turnstileOptions: { secretKey: string }
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const gqlContext = GqlExecutionContext.create(context)
		const request = gqlContext.getContext<GraphQLContext>().req

		const token = request?.headers['cf-turnstile-token'] as string

		// if (process.env.NODE_ENV === 'development') {
		// 	return true
		// }

		if (!token) {
			throw new ForbiddenException('Captcha token is missing')
		}

		const { success } = (await this.turnstileService.validateToken(token)) as {
			success: boolean
		}

		if (!success) {
			throw new ForbiddenException('Invalid captcha token')
		}
		return true
	}
}
