'use client'

import { LucideIcon } from 'lucide-react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'

interface Option {
	value: string
	label: string
}

interface Props {
	value?: string
	onValueChange?: (value: string) => void
	icon: LucideIcon
	options: Option[]
	placeholder?: string
	label?: string
}

export function SelectInput({
	value,
	onValueChange,
	icon: Icon,
	options,
	placeholder = '—',
	label
}: Props) {
	return (
		<div>
			{label && (
				<label className="mb-1 block text-xs text-gray-400">{label}</label>
			)}
			<Select
				key={value}
				value={value ?? ''}
				onValueChange={onValueChange}
			>
				<SelectTrigger className="group data-[state=open]:border-primary w-full rounded-full border-3 border-gray-100 bg-gray-50 pl-3 focus-visible:ring-0 data-[state=open]:bg-white">
					<Icon
						size={16}
						strokeWidth={2}
						className="group-data-[state=open]:text-primary group-focus-visible:text-primary shrink-0 text-gray-400 transition-colors"
					/>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map(opt => (
						<SelectItem
							key={opt.value}
							value={opt.value}
						>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
