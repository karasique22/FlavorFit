'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRoundCog } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { HeadingWithIcon } from '@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon'
import { Button } from '@/shared/components/ui/button'

import { GetProfileQuery, UpdateProfileDocument } from '@/__generated__/graphql'

import {
	type ProfileForm,
	profileFormSchema
} from '../types/profile-update.schema'
import { BodyMeasurementsForm } from './BodyMeasurementsForm'
import { GeneralInfoForm } from './GeneralInfoForm'

export function ProfileForm({ data }: { data: GetProfileQuery }) {
	const form = useForm<ProfileForm>({
		resolver: zodResolver(profileFormSchema),
		mode: 'onChange'
	})

	useEffect(() => {
		if (!data?.me?.profile) return

		const { profile } = data.me

		form.reset({
			profile,
			measurements: profile.bodyMeasurements[0]
		})
	}, [data, form])

	const [updateProfile, { loading }] = useMutation(UpdateProfileDocument, {
		onCompleted() {
			toast.success('Profile updated successfully')
		}
	})

	const submit = form.handleSubmit(({ profile, measurements }) => {
		updateProfile({
			variables: {
				profile,
				measurements
			}
		})
	})

	return (
		<form
			className="space-y-6 rounded-2xl bg-white p-5"
			onSubmit={submit}
		>
			<div className="flex justify-between">
				<HeadingWithIcon Icon={UserRoundCog}>
					Personal Information
				</HeadingWithIcon>

				<div className="flex gap-2">
					<Button
						className="rounded-full"
						variant="outline"
						type="button"
					>
						Cancel
					</Button>

					<Button
						className="rounded-full"
						variant="accent"
						disabled={loading || !form.formState.isDirty}
					>
						Save changes
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8">
				<GeneralInfoForm
					form={form}
					email={data?.me?.email}
					isEmailVerified={data?.me?.isEmailVerified}
				/>
				<BodyMeasurementsForm form={form} />
			</div>
		</form>
	)
}
