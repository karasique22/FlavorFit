'use client'

import { Bell, Headset } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/features/auth/hooks/useAuth'

import { NavMenu } from '@/shared/components/custom-ui/nav-menu/NavMenu'
import { UserInfo } from '@/shared/components/custom-ui/user-info/UserInfo'
import { Button } from '@/shared/components/ui/button'

import { PAGES } from '@/shared/config/page.config'

import { navMenuItems } from './nav.data'

export function Header() {
	const { user } = useAuth()

	return (
		<header className="flex items-center justify-between p-5">
			<div className="flex items-center gap-8">
				<Link
					href={PAGES.DASHBOARD}
					className="from-primary to-primary-dark flex size-10 items-center justify-center rounded-full bg-linear-to-t text-center align-middle text-xl font-black text-white"
				>
					F
				</Link>
				<NavMenu menu={navMenuItems} />
			</div>
			<div className="flex items-center gap-8">
				<div className="flex gap-2">
					<Button
						variant="soft"
						size={'icon-lg'}
						className="rounded-full"
					>
						<Headset />
					</Button>
					<Button
						variant="soft"
						size={'icon-lg'}
						className="rounded-full"
					>
						<Bell />
					</Button>
				</div>

				<UserInfo
					name={user?.profile?.fullName || 'Guest'}
					email={user?.email || ''}
				/>
			</div>
		</header>
	)
}
