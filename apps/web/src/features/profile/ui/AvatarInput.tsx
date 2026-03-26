'use client'

import { PencilLine } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/shared/components/ui/button'

import { resolveAvatarSrc } from '@/shared/utils/avatar'

interface Props {
	value?: string
	onChange: (file: File) => void
}

export function AvatarInput({ value, onChange }: Props) {
	const [preview, setPreview] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="relative">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={preview ?? resolveAvatarSrc(value)}
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
					if (!file) return
					setPreview(URL.createObjectURL(file))
					onChange(file)
				}}
			/>
			<Button
				type="button"
				className="absolute -right-2 bottom-0 rounded-full bg-white"
				variant="soft"
				size="icon-xs"
				onClick={() => inputRef.current?.click()}
			>
				<PencilLine className="size-3.5" />
			</Button>
		</div>
	)
}
