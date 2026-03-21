import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import type { Metadata } from 'next'

import { AuthForm } from '@/features/auth/ui/AuthForm'

export const metadata: Metadata = {
	title: 'Register',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<AuthForm type="register" />
		</div>
	)
}
