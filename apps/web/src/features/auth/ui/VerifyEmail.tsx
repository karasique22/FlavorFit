'use client'

import { useMutation } from '@apollo/client/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PAGES } from '@/shared/config/page.config'

import { VerifyEmailDocument } from '@/__generated__/graphql'

export function VerifyEmail() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')

	const [verifyEmail] = useMutation(VerifyEmailDocument, {
		onCompleted: () => {
			toast.success('Email verified')
			router.replace(PAGES.LOGIN)
		},
		onError() {
			toast.error('Invalid or expired verification link')
		}
	})

	useEffect(() => {
		if (token) {
			verifyEmail({ variables: { token } })
		}
	}, [token, verifyEmail])

	if (!token)
		return (
			<div>
				<p>Invalid verification link</p>
				<Link href={PAGES.LOGIN}>Go to login</Link>
			</div>
		)

	return <div>Please, wait</div>
}
