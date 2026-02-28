import { jwtVerify } from 'jose'

import { User } from '@repo/database'

type AuthTokenData = Pick<User, 'id' | 'role'>

export async function jwtVerifyServer(accessToken: string) {
	try {
		const { payload }: { payload: AuthTokenData } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(process.env.JWT_SECRET)
		)

		return payload
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			console.log('Token expired')
			return null
		}

		console.log('Token verification failed', error)
		return null
	}
}
