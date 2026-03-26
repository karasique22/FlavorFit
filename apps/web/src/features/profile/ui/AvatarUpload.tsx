'use client'

import { Loader2, Pencil } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'

import { SERVER_URL } from '@/shared/config/api.config'

import { resolveAvatarSrc } from '@/shared/utils/avatar'

interface Props {
	value?: string
	onChange: (url: string) => void
}

export function AvatarUpload({ value, onChange }: Props) {
	const [loading, setLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	async function upload(file: File) {
		setLoading(true)

		try {
			const formData = new FormData()
			formData.append('file', file)

			const res = await fetch(`${SERVER_URL}/media-upload/avatar`, {
				method: 'POST',
				body: formData,
				credentials: 'include'
			})

			if (!res.ok) throw new Error('Upload failed')

			const data = await res.json()
			onChange(data.url)
		} catch {
			toast.error('Failed to upload avatar')
		} finally {
			setLoading(false)
		}
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
			<input
				ref={inputRef}
				type="file"
				hidden
				accept="image/*"
				onChange={e => {
					const file = e.target.files?.[0]
					if (file) upload(file)
				}}
			/>
			<Button
				type="button"
				className="absolute right-0 bottom-0 rounded-full bg-white p-0.5"
				variant="soft"
				size="icon-xs"
				disabled={loading}
				onClick={() => inputRef.current?.click()}
			>
				{loading ? <Loader2 className="animate-spin" /> : <Pencil />}
			</Button>
		</div>
	)
}
