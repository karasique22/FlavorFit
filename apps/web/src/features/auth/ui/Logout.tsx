'use client'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'

import { PAGES } from '@/shared/config/page.config'

import { LogoutDocument } from '@/__generated__/graphql'

export function Logout() {
	const [logout, { loading, error }] = useMutation(LogoutDocument)

	const client = useApolloClient()
	const router = useRouter()

	const handleLogout = async () => {
		await logout()
		toast.success('Logged out successfully')

		router.replace(PAGES.LOGIN)
		await client.clearStore()
	}

	return (
		<Button
			size={'icon-sm'}
			variant={'ghost'}
			onClick={() => handleLogout()}
			disabled={loading}
		>
			<LogOut />
		</Button>
	)
}
