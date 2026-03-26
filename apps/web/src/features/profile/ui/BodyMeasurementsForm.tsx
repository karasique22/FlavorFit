'use client'

import { Activity, Target } from 'lucide-react'
import Image from 'next/image'
import { UseFormReturn } from 'react-hook-form'

import { FormFieldSelect } from '@/shared/components/custom-ui/form-field-select/FormFieldSelect'

import { formatEnum } from '@/shared/utils/enum'

import { ActivityLevel, NutritionalGoal } from '@/__generated__/graphql'

import { ProfileForm } from '../types/profile-update.schema'
import { MeasurementField } from './MeasurementField'

interface Props {
	form: UseFormReturn<ProfileForm, unknown, ProfileForm>
}

export function BodyMeasurementsForm({ form }: Props) {
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
						<MeasurementField
							form={form}
							name="measurements.height"
							label="Height"
							unit="cm"
						/>

						<div className="grid grid-cols-2 gap-3">
							<MeasurementField
								form={form}
								name="measurements.weight"
								label="Current weight"
								unit="kg"
							/>
							<MeasurementField
								form={form}
								name="measurements.goalWeight"
								label="Desired weight"
								unit="kg"
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<MeasurementField
								form={form}
								name="measurements.waistCircumference"
								label="Waist"
								unit="cm"
							/>
							<MeasurementField
								form={form}
								name="measurements.chestMeasurement"
								label="Chest"
								unit="cm"
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<MeasurementField
								form={form}
								name="measurements.thighCircumference"
								label="Thigh"
								unit="cm"
							/>
							<MeasurementField
								form={form}
								name="measurements.armCircumference"
								label="Arm"
								unit="cm"
							/>
						</div>

						<FormFieldSelect
							control={form.control}
							name="profile.nutritionalGoal"
							label="Nutritional goal"
							icon={Target}
							options={Object.values(NutritionalGoal).map(v => ({
								value: v,
								label: formatEnum(v)
							}))}
						/>

						<FormFieldSelect
							control={form.control}
							name="profile.activityLevel"
							label="Activity level"
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
