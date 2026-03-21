'use client'

import { Bell, Headset } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/features/auth/hooks/useAuth'

import { NavMenu } from '@/shared/components/custom-ui/nav-menu/NavMenu'
import { UserInfo } from '@/shared/components/custom-ui/user-info/UserInfo'
import { Button } from '@/shared/components/ui/button'

import { PAGES } from '@/shared/config/page.config'

import { Logout } from '../../auth/ui/Logout'
import { navMenuItems } from './nav.data'

export function Header() {
	const { user, isLoading } = useAuth()

	return (
		<header className="flex flex-col items-center justify-between gap-5 pb-5">
			{user && !user?.isEmailVerified && (
				<div className="text-primary border-primary w-full rounded-xl border-2 p-4 text-center">
					Please verify your email address.
				</div>
			)}
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-8">
					<Link
						href={PAGES.DASHBOARD}
						className="from-primary to-primary-dark flex size-10 items-center justify-center rounded-full bg-linear-to-t text-center align-middle text-xl font-black text-white"
					>
						F
					</Link>
					<NavMenu menu={navMenuItems} />
				</div>
				<div className="flex items-center gap-9">
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

					<div className="flex items-center gap-1">
						<UserInfo
							avatarUrl={user?.profile?.avatarUrl || ''}
							name={user?.profile?.fullName || 'Guest'}
							email={user?.email || ''}
							isLoading={isLoading}
						/>

						<Logout />
					</div>
				</div>
			</div>
		</header>
	)
}
