'use client'

import { Ruler } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { FormFieldInput } from '@/shared/components/custom-ui/form-field-input/FormFieldInput'

import { ProfileForm } from '../types/profile-update.schema'

interface Props {
	form: UseFormReturn<ProfileForm, unknown, ProfileForm>
	name: `measurements.${keyof NonNullable<ProfileForm['measurements']>}`
	label: string
	unit: string
}

export function MeasurementField({ form, name, label, unit }: Props) {
	return (
		<FormFieldInput
			control={form.control}
			name={name}
			label={label}
			icon={Ruler}
			unit={unit}
			type="number"
		/>
	)
}
