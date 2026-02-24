'use client'

import { useApolloClient, useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import {
	LoginDocument,
	LoginMutation,
	LoginMutationVariables,
	MeDocument,
	RegisterDocument,
	RegisterMutation,
	RegisterMutationVariables
} from '@/__generated__/graphql'

import { AuthFormData, authFormSchema } from '../types/auth-form.schema'
import { AuthToggleForm } from './AuthToggleForm'

interface Props {
	type: 'login' | 'register'
}

export function AuthForm({ type }: Props) {
	const isLogin = type === 'login'

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthFormData>({
		resolver: zodResolver(authFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [auth, { loading, error }] = useMutation<
		LoginMutation | RegisterMutation,
		LoginMutationVariables | RegisterMutationVariables
	>(isLogin ? LoginDocument : RegisterDocument, {
		update: (cache, { data }) => {
			const authData = 'login' in data! ? data.login : data?.register
			if (!authData) return

			cache.writeQuery({
				query: MeDocument,
				data: {
					me: authData.user
				}
			})
		},

		onCompleted: () => {
			toast.success(
				isLogin ? 'Logged in successfully!' : 'Registered successfully!',
				{ id: 'auth-success' }
			)
		},
		onError: e => {
			toast.error(e.message, { id: 'auth-error' })
		}
	})

	const onSubmit = (data: AuthFormData) => {
		auth({ variables: { data } })
	}

	return (
		<div className="flex h-screen">
			<div className="relative m-auto w-sm rounded-lg bg-linear-to-tr from-violet-600 to-violet-400 p-8 text-white">
				<h1 className="mb-6 text-center text-4xl font-bold">
					{type === 'register' ? 'Register' : 'Login'}
				</h1>

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

					<Input
						{...register('password')}
						type="password"
						placeholder="Password"
						aria-invalid={!!errors.password}
					/>

					{errors.password && (
						<p className="text-destructive -mt-2 text-sm">
							{errors.password.message}
						</p>
					)}

					<div className="text-center">
						<Button
							type="submit"
							variant="accent"
						>
							{type === 'register' ? 'Register' : 'Login'}
						</Button>
					</div>
				</form>

				<AuthToggleForm isLogin={isLogin} />

				<Image
					className="absolute -bottom-12 -left-20 -rotate-12 select-none"
					src="/images/mascots/salad.png"
					alt="Salad Mascot"
					width={200}
					height={200}
					draggable={false}
				/>
			</div>
		</div>
	)
}
