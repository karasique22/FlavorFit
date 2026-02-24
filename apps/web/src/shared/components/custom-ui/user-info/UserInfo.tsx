import Image from 'next/image'

import { getGravatarUrl } from '@/shared/utils/gravatar'

interface Props {
	avatarUrl?: string
	name: string
	email: string
}

export function UserInfo({ avatarUrl, name, email }: Props) {
	avatarUrl = avatarUrl || getGravatarUrl(email)

	return (
		<div className="flex items-center gap-2">
			<Image
				src={avatarUrl}
				alt={name}
				width={45}
				height={45}
				className="rounded-full"
			/>
			<div className="flex flex-col">
				<p className="text-md font-medium">{name}</p>
				<p className="text-sm text-gray-500">{email}</p>
			</div>
		</div>
	)
}
