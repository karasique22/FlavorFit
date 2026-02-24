import type { PropsWithChildren } from 'react'

import { Header } from '@/features/layout/header/Header'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}
