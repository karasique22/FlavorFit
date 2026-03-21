'use client'

import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import { RequestPasswordResetDocument } from '@/__generated__/graphql'

const schema = z.object({
	email: z.email()
})

type formData = z.infer<typeof schema>

export function ForgotPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formData>({
		resolver: zodResolver(schema),
		mode: 'onSubmit',
		defaultValues: {
			email: ''
		}
	})

	const [requestPasswordReset, { loading }] = useMutation(
		RequestPasswordResetDocument,
		{
			onCompleted: () => {
				toast.success(
					'If an account with that email exists, a password reset link has been sent'
				)
			},
			onError: e => {
				toast.error(e.message)
			}
		}
	)

	const onSubmit = (data: formData) => {
		requestPasswordReset({ variables: { data } })
	}

	return (
		<div className="flex h-screen">
			<div className="relative m-auto w-sm rounded-lg bg-linear-to-tr from-violet-600 to-violet-400 p-8 text-white">
				<h1 className="mb-6 text-center text-4xl font-bold">Forgot Password</h1>

				<form
					className="space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input
						{...register('email')}
						type="email"
						placeholder="Email"
						aria-invalid={!!errors.email}
					/>

					{errors.email && (
						<p className="text-destructive -mt-2 text-sm">
							{errors.email.message}
						</p>
					)}

					<div className="text-center">
						<Button
							type="submit"
							variant="accent"
							disabled={loading}
						>
							Send reset link
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
