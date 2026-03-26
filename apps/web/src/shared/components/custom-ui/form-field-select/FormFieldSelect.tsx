'use client'

import { LucideIcon } from 'lucide-react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { SelectInput } from '@/shared/components/custom-ui/select-input/SelectInput'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/form'

interface Option {
	value: string
	label: string
}

interface Props<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	label?: string
	icon: LucideIcon
	options: Option[]
	placeholder?: string
}

export function FormFieldSelect<T extends FieldValues>({
	control,
	name,
	label,
	icon,
	options,
	placeholder
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="gap-0">
					<FormControl>
						<SelectInput
							label={label}
							icon={icon}
							options={options}
							placeholder={placeholder}
							value={field.value ?? undefined}
							onValueChange={field.onChange}
						/>
					</FormControl>
					<FormMessage className="text-xs" />
				</FormItem>
			)}
		/>
	)
}
