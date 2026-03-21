'use client'

import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { Input } from '@/shared/components/ui/input'

import { cn } from '@/shared/utils/index'

interface Props extends React.ComponentProps<'input'> {
	icon: LucideIcon
	label?: string
	unit?: string
	trailing?: ReactNode
}

export function FieldInput({
	icon: Icon,
	label,
	unit,
	trailing,
	className,
	...inputProps
}: Props) {
	return (
		<div>
			{label && (
				<label className="mb-1 block text-xs text-gray-400">{label}</label>
			)}
			<div className="group relative h-9">
				<Icon
					className="group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 transition-colors"
					size={16}
					strokeWidth={2.5}
				/>
				<Input
					variant="pill"
					className={cn(
						'pl-9',
						unit && 'pr-12',
						trailing && 'pr-10',
						inputProps.type === 'number' &&
							'[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
						className
					)}
					{...inputProps}
				/>
				{unit && (
					<span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs text-gray-400">
						{unit}
					</span>
				)}
				{trailing && (
					<span className="absolute top-1/2 right-3.5 -translate-y-1/2">
						{trailing}
					</span>
				)}
			</div>
		</div>
	)
}
