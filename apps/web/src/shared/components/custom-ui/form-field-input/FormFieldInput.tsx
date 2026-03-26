'use client'

import { toOptionalNumber } from '@/shared/utils'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { FormControl, FormField, FormItem } from '@/shared/components/ui/form'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/shared/components/ui/tooltip'

interface Props<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	label?: string
	icon: LucideIcon
	placeholder?: string
	unit?: string
	trailing?: ReactNode
	type?: React.ComponentProps<'input'>['type']
}

export function FormFieldInput<T extends FieldValues>({
	control,
	name,
	label,
	icon,
	placeholder,
	unit,
	trailing,
	type = 'text'
}: Props<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem className="gap-0">
					<FormControl>
						<Tooltip open={!!fieldState.error}>
							<TooltipTrigger asChild>
								<FieldInput
									label={label}
									icon={icon}
									placeholder={placeholder}
									unit={unit}
									trailing={trailing}
									type={type}
									{...field}
									value={field.value ?? ''}
									onChange={e =>
										type === 'number'
											? field.onChange(toOptionalNumber(e.target.value))
											: field.onChange(e)
									}
								/>
							</TooltipTrigger>
							{fieldState.error && (
								<TooltipContent
									side="top"
									variant="destructive"
								>
									{fieldState.error.message}
								</TooltipContent>
							)}
						</Tooltip>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
