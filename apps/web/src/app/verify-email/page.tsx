import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import type { Metadata } from 'next'

import { VerifyEmail } from '@/features/auth/ui/VerifyEmail'

export const metadata: Metadata = {
	title: 'Verify email',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<Suspense>
			<VerifyEmail />
		</Suspense>
	)
}
