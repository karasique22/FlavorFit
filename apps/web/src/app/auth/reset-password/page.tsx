import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import type { Metadata } from 'next'

import { ResetPassword } from '@/features/auth/ui/ResetPassword'

export const metadata: Metadata = {
	title: 'Reset Password',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <ResetPassword />
}
