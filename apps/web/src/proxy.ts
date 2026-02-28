import { NextRequest, NextResponse } from 'next/server'

import { PAGES } from './shared/config/page.config'
import { getAndValidateTokens } from './shared/lib/server/get-tokens.server'
import { jwtVerifyServer } from './shared/lib/server/jwt-verify.server'

export async function proxy(req: NextRequest) {
	const tokens = await getAndValidateTokens(req)

	if (!tokens || !tokens.accessToken) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, req.url))
	}

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*']
}
