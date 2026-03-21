'use client'

import { toOptionalNumber } from '@/shared/utils'
import { Activity, Ruler, Scale, Target } from 'lucide-react'
import Image from 'next/image'
import { UseFormReturn } from 'react-hook-form'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { FormSelect } from '@/shared/components/custom-ui/form-select/FormSelect'

import { formatEnum } from '@/shared/utils/enum'

import { ActivityLevel, NutritionalGoal } from '@/__generated__/graphql'

import { ProfileForm } from '../types/profile-update.schema'

interface Props {
	form: UseFormReturn<ProfileForm, unknown, ProfileForm>
}

export function BodyMeasurementsForm({ form }: Props) {
	const { register, control } = form

	return (
		<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<div className="flex gap-6">
				<div className="flex shrink-0 items-center justify-center">
					<Image
						src="/images/Female.svg"
						alt="Body measurements"
						width={190}
						height={340}
						className="h-full object-contain"
					/>
				</div>
				<div className="min-w-0 flex-1">
					<h2 className="mb-5 text-base font-semibold text-gray-900">
						Body measurements
					</h2>

					<div className="space-y-3">
						<FieldInput
							label="Growth"
							icon={Ruler}
							unit="cm"
							type="number"
							{...register('measurements.height', {
								setValueAs: toOptionalNumber
							})}
						/>

						<div className="grid grid-cols-2 gap-3">
							<FieldInput
								label="Current weight"
								icon={Scale}
								unit="kg"
								type="number"
								{...register('measurements.weight', {
									setValueAs: toOptionalNumber
								})}
							/>
							<FieldInput
								label="Desired weight"
								icon={Scale}
								unit="kg"
								type="number"
								{...register('measurements.goalWeight', {
									setValueAs: toOptionalNumber
								})}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FieldInput
								label="Waist circumference"
								icon={Ruler}
								unit="cm"
								type="number"
								{...register('measurements.waistCircumference', {
									setValueAs: toOptionalNumber
								})}
							/>
							<FieldInput
								label="Chest"
								icon={Ruler}
								unit="cm"
								type="number"
								{...register('measurements.chestMeasurement', {
									setValueAs: toOptionalNumber
								})}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<FieldInput
								label="Thigh circumference"
								icon={Ruler}
								unit="cm"
								type="number"
								{...register('measurements.thighCircumference', {
									setValueAs: toOptionalNumber
								})}
							/>
							<FieldInput
								label="Arm circumference"
								icon={Ruler}
								unit="cm"
								type="number"
								{...register('measurements.armCircumference', {
									setValueAs: toOptionalNumber
								})}
							/>
						</div>

						<FormSelect
							control={control}
							name="profile.nutritionalGoal"
							label="Set your nutritional goals"
							icon={Target}
							options={Object.values(NutritionalGoal).map(v => ({
								value: v,
								label: formatEnum(v)
							}))}
						/>

						<FormSelect
							control={control}
							name="profile.activityLevel"
							label="Define your activity level"
							icon={Activity}
							options={Object.values(ActivityLevel).map(v => ({
								value: v,
								label: formatEnum(v)
							}))}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
