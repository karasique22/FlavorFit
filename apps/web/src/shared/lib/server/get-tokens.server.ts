import { NextRequest } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/app.constants'

import {
	RefreshTokensDocument,
	RefreshTokensMutation
} from '@/__generated__/graphql'

import { serverApolloClient } from '../apollo/ApolloClient'

export async function getAndValidateTokens(req: NextRequest) {
	const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value
	let accessToken = req.cookies.get(ACCESS_TOKEN)?.value

	if (!refreshToken) {
		return null
	}

	if (!accessToken) {
		try {
			const result = await serverApolloClient.mutate<RefreshTokensMutation>({
				mutation: RefreshTokensDocument,
				context: {
					headers: {
						Cookie: `${REFRESH_TOKEN}=${refreshToken}`
					}
				}
			})

			accessToken = result.data?.refreshTokens?.accessToken ?? undefined
		} catch {
			return null
		}
	}

	return { accessToken, refreshToken }
}
