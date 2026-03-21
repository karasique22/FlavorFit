import type { Metadata } from 'next'

import { Profile } from '@/features/profile/ui/Profile'
import { ProfileForm } from '@/features/profile/ui/ProfileForm'

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <Profile />
}
