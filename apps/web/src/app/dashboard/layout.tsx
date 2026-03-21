import type { PropsWithChildren } from 'react'

import { Header } from '@/features/layout/header/Header'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className="p-5">
			<Header />
			{children}
		</div>
	)
}
