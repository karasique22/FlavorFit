'use client'

import { LucideIcon } from 'lucide-react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

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

interface Props<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	icon: LucideIcon
	options: Option[]
	placeholder?: string
	label: string
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	icon: Icon,
	options,
	placeholder = '—',
	label
}: Props<T>) {
	return (
		<div>
			<label className="mb-1 block text-xs text-gray-400">{label}</label>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<Select
						key={field.value}
						value={field.value ?? ''}
						onValueChange={field.onChange}
					>
						<SelectTrigger className="group w-full rounded-full border-3 border-gray-100 bg-gray-50 pl-3 focus-visible:ring-0 data-[state=open]:border-primary data-[state=open]:bg-white">
							<Icon
								size={16}
								strokeWidth={2.5}
								className="shrink-0 text-gray-400 transition-colors group-data-[state=open]:text-primary"
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
				)}
			/>
		</div>
	)
}
