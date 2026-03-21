import Link from 'next/link'

import { PAGES } from '@/shared/config/page.config'

import { resolveAvatarSrc } from '@/shared/utils/avatar'
import { getGravatarUrl } from '@/shared/utils/gravatar'

import { Skeleton } from '../../ui/skeleton'

interface Props {
	avatarUrl?: string
	name: string
	email: string
	isLoading: boolean
}

export function UserInfo({ avatarUrl, name, email, isLoading }: Props) {
	const src = avatarUrl ? resolveAvatarSrc(avatarUrl) : getGravatarUrl(email)

	if (isLoading) {
		return (
			<div className="flex items-center gap-2">
				<Skeleton className="size-11 rounded-full" />
				<div className="flex flex-col gap-1">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center gap-2">
			<Link href={PAGES.PROFILE}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={src}
					alt={name}
					width={45}
					height={45}
					className="size-11 rounded-full object-cover"
				/>
			</Link>

			<div className="flex flex-col">
				<p className="text-md font-medium">{name}</p>
				<p className="text-sm text-gray-500">{email}</p>
			</div>
		</div>
	)
}
