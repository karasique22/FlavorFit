import type { PropsWithChildren } from 'react'

import { Header } from '@/features/layout/header/Header'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className="flex flex-col h-full p-5">
			<Header />
			<div className="flex-1 flex min-h-0 w-full">
				{children}
			</div>
		</div>
	)
}
