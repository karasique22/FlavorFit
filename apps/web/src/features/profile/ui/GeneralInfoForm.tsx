'use client'

import { toOptionalNumber } from '@/shared/utils'
import {
	CheckCircle2,
	CircleAlert,
	Link2,
	Mail,
	Plus,
	UserRound,
	X
} from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { FormSelect } from '@/shared/components/custom-ui/form-select/FormSelect'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

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
	const { register, watch, setValue, control } = form

	const socials = watch('profile.socials') ?? []

	function addSocial() {
		setValue('profile.socials', [...socials, ''])
	}

	function removeSocial(index: number) {
		setValue(
			'profile.socials',
			socials.filter((_, i) => i !== index)
		)
	}

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
						onChange={url => setValue('profile.avatarUrl', url)}
					/>
					<div className="flex-1">
						<FieldInput
							label="Full name"
							icon={UserRound}
							placeholder="Full Name"
							{...register('profile.fullName')}
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
							<CheckCircle2
								size={16}
								className="text-success"
							/>
						) : (
							<CircleAlert
								size={16}
								className="text-destructive"
							/>
						)
					}
				/>

				{/* Gender + Age */}
				<div className="grid grid-cols-2 gap-3">
					<FormSelect
						control={control}
						name="profile.gender"
						label="Gender"
						icon={UserRound}
						options={Object.values(Gender).map(v => ({
							value: v,
							label: formatEnum(v)
						}))}
					/>
					<div>
						<label className="mb-1 block text-xs text-gray-400">Age</label>
						<Input
							type="number"
							min={1}
							max={120}
							placeholder="30 y.o."
							variant="pill"
							{...register('profile.age', { setValueAs: toOptionalNumber })}
						/>
					</div>
				</div>

				{/* Bio */}
				<div>
					<label className="mb-1 block text-xs text-gray-400">Bio</label>
					<textarea
						rows={4}
						placeholder="Tell something about yourself..."
						className="focus:border-primary focus:ring-primary/50 w-full resize-none rounded-2xl border-3 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 transition-colors outline-none placeholder:text-gray-400 focus:bg-white focus:ring-1"
						{...register('profile.bio')}
					/>
				</div>

				{/* Socials */}
				<div>
					<label className="mb-2 block text-xs text-gray-400">Sites</label>
					<div className="space-y-2">
						{socials.map((_, index) => (
							<FieldInput
								key={index}
								icon={Link2}
								placeholder="https://..."
								trailing={
									<button
										type="button"
										onClick={() => removeSocial(index)}
										className="flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
									>
										<X size={12} />
									</button>
								}
								{...register(`profile.socials.${index}`)}
							/>
						))}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="rounded-full text-gray-500 hover:text-gray-700"
							onClick={addSocial}
						>
							<Plus size={14} /> Add website address
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
