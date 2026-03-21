'use client'

import { Edit } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'

import { SERVER_URL } from '@/shared/config/api.config'

import { resolveAvatarSrc } from '@/shared/utils/avatar'

interface Props {
	value?: string
	onChange: (url: string) => void
}

export function AvatarUpload({ value, onChange }: Props) {
	const [loading, setLoading] = useState(false)

	async function upload(file: File) {
		setLoading(true)

		const formData = new FormData()
		formData.append('file', file)

		const res = await fetch(`${SERVER_URL}/media-upload/avatar`, {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})

		const data = await res.json()

		onChange(data.url)

		setLoading(false)
	}

	return (
		<div className="relative">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={resolveAvatarSrc(value)}
				width={48}
				height={48}
				alt="avatar"
				className="size-20 rounded-full object-cover"
			/>
			<Button
				className="absolute right-0 bottom-0 rounded-full bg-white p-0.5"
				variant="soft"
				size="icon-xs"
				disabled={loading}
			>
				<input
					type="file"
					hidden
					accept="image/*"
					onChange={e => {
						const file = e.target.files?.[0]
						if (file) upload(file)
					}}
				/>
				<span>
					<Edit className={loading ? 'animate-spin' : ''} />
				</span>
			</Button>
		</div>
	)
}
