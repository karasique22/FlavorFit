'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import { PAGES } from '@/shared/config/page.config'

import { ResetPasswordDocument } from '@/__generated__/graphql'

const schema = z.object({
	newPassword: z.string().min(6).max(100)
})

type FormData = z.infer<typeof schema>

export function ResetPassword() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onSubmit',
		defaultValues: { newPassword: '' }
	})

	const [resetPassword, { loading }] = useMutation(ResetPasswordDocument, {
		onCompleted: () => {
			toast.success('Password reset successfully')
			router.replace(PAGES.LOGIN)
		},
		onError: e => {
			toast.error(e.message)
		}
	})

	const onSubmit = (data: FormData) => {
		if (!token) return
		resetPassword({
			variables: { data: { token, newPassword: data.newPassword } }
		})
	}

	if (!token)
		return (
			<div className="flex h-screen">
				<div className="m-auto text-center">
					<p>Invalid reset link</p>
				</div>
			</div>
		)

	return (
		<div className="flex h-screen">
			<div className="relative m-auto w-sm rounded-lg bg-linear-to-tr from-violet-600 to-violet-400 p-8 text-white">
				<h1 className="mb-6 text-center text-4xl font-bold">Reset Password</h1>

				<form
					className="space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input
						{...register('newPassword')}
						type="password"
						placeholder="New password"
						aria-invalid={!!errors.newPassword}
					/>

					{errors.newPassword && (
						<p className="text-destructive -mt-2 text-sm">
							{errors.newPassword.message}
						</p>
					)}

					<div className="text-center">
						<Button
							type="submit"
							variant="accent"
							disabled={loading}
						>
							Reset password
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
