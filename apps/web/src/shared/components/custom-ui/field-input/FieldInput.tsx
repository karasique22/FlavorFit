'use client'

import { LucideIcon } from 'lucide-react'
import { ReactNode, forwardRef } from 'react'

import { Input } from '@/shared/components/ui/input'

import { cn } from '@/shared/utils/index'

interface Props extends React.ComponentProps<'input'> {
	icon?: LucideIcon
	label?: string
	unit?: string
	trailing?: ReactNode
}

export const FieldInput = forwardRef<HTMLInputElement, Props>(
	({ icon: Icon, label, unit, trailing, className, ...inputProps }, ref) => {
		return (
			<div>
				{label && (
					<label className="mb-1 block text-xs text-gray-400">{label}</label>
				)}
				<div className="group relative h-9">
					{Icon && (
						<Icon
							className="group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 transition-colors"
							size={16}
							strokeWidth={2}
						/>
					)}
					<Input
						ref={ref}
						variant="pill"
						className={cn(
							Icon && 'pl-9',
							unit && 'pr-12',
							trailing && 'pr-10',
							inputProps.type === 'number' &&
								'[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
							className
						)}
						{...inputProps}
						onKeyDown={e => {
							if (
								inputProps.type === 'number' &&
								(e.key === '-' || e.key === 'e')
							)
								e.preventDefault()
							inputProps.onKeyDown?.(e)
						}}
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
)

FieldInput.displayName = 'FieldInput'
