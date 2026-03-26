'use client'

import {
	CheckCircle,
	CircleAlert,
	Link2,
	Mail,
	Plus,
	UserRound,
	X
} from 'lucide-react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { FormFieldInput } from '@/shared/components/custom-ui/form-field-input/FormFieldInput'
import { FormFieldSelect } from '@/shared/components/custom-ui/form-field-select/FormFieldSelect'
import { Button } from '@/shared/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/components/ui/form'

import { formatEnum } from '@/shared/utils/enum'
import { getGravatarUrl } from '@/shared/utils/gravatar'

import { Gender } from '@/__generated__/graphql'

import { ProfileForm } from '../types/profile-update.schema'
import { AvatarUpload } from './AvatarUpload'

interface Props {
	form: UseFormReturn<ProfileForm, unknown, ProfileForm>
	email?: string
	isEmailVerified?: boolean
}

export function GeneralInfoForm({ form, email, isEmailVerified }: Props) {
	const { watch, setValue, control } = form

	const {
		fields: socialFields,
		append,
		remove
	} = useFieldArray({
		control,
		name: 'profile.socials'
	})

	return (
		<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			<h2 className="mb-5 text-base font-semibold text-gray-900">
				General information
			</h2>

			<div className="space-y-3">
				{/* Avatar + Full Name */}
				<div className="flex items-center gap-4">
					<AvatarUpload
						value={
							watch('profile.avatarUrl') ||
							(email ? getGravatarUrl(email) : undefined)
						}
						onChange={url =>
							setValue('profile.avatarUrl', url, { shouldDirty: true })
						}
					/>
					<div className="flex-1">
						<FormFieldInput
							control={control}
							name="profile.fullName"
							label="Full name"
							icon={UserRound}
							placeholder="Full Name"
						/>
					</div>
				</div>

				{/* Email */}
				<FieldInput
					label="Email"
					icon={Mail}
					value={email}
					readOnly
					trailing={
						isEmailVerified ? (
							<CheckCircle
								size={20}
								className="text-success"
							/>
						) : (
							<CircleAlert
								size={20}
								className="text-destructive"
							/>
						)
					}
				/>

				{/* Gender + Age */}
				<div className="grid grid-cols-2 gap-3">
					<FormFieldSelect
						control={control}
						name="profile.gender"
						label="Gender"
						icon={UserRound}
						options={Object.values(Gender).map(v => ({
							value: v,
							label: formatEnum(v)
						}))}
					/>
					<FormFieldInput
						control={control}
						name="profile.age"
						label="Age"
						icon={UserRound}
						type="number"
						placeholder="30 y.o."
					/>
				</div>

				{/* Bio */}
				<FormField
					control={control}
					name="profile.bio"
					render={({ field }) => (
						<FormItem className="gap-0">
							<FormControl>
								<div>
									<label className="mb-1 block text-xs text-gray-400">
										Bio
									</label>
									<div className="focus-within:border-primary focus-within:ring-primary/50 overflow-hidden rounded-2xl border-3 border-gray-100 bg-gray-50 transition-colors focus-within:bg-white focus-within:ring-1">
										<textarea
											rows={4}
											maxLength={500}
											placeholder="Tell something about yourself..."
											className="w-full resize-none bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
											{...field}
											value={field.value ?? ''}
										/>
									</div>
								</div>
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>

				{/* Socials */}
				<div>
					<label className="mb-2 block text-xs text-gray-400">Sites</label>
					<div className="space-y-2">
						{socialFields.map((socialField, index) => (
							<FormField
								key={socialField.id}
								control={control}
								name={`profile.socials.${index}.value`}
								render={({ field }) => (
									<FormItem className="gap-0">
										<FormControl>
											<FieldInput
												icon={Link2}
												placeholder="https://..."
												trailing={
													<button
														type="button"
														onClick={() => remove(index)}
														className="flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
													>
														<X size={12} />
													</button>
												}
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						))}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="focus-visible:ring-primary rounded-full text-gray-500 hover:text-gray-700 focus-visible:ring-offset-2"
							onClick={() => append({ value: '' })}
						>
							<Plus size={14} /> Add website address
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
