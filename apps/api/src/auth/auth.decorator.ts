import { Type, UseGuards, applyDecorators } from '@nestjs/common'
import { AdminGuard } from 'src/auth/guards/admin.guard'
import { GqlAuthGuard } from 'src/auth/guards/auth.guard'

import { Role } from '@repo/database'

export const Auth = (role?: Role) => {
	const guards: Array<Type<any>> = [GqlAuthGuard]

	if (role === Role.ADMIN) {
		guards.push(AdminGuard)
	}

	return applyDecorators(UseGuards(...guards))
}
