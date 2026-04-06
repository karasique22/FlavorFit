'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type PropsWithChildren } from 'react'

import { Toaster } from '@/shared/components/ui/sonner'
import { TooltipProvider } from '@/shared/components/ui/tooltip'

import { ApolloWrapper } from './ApolloWrapper'

export function Providers({ children }: PropsWithChildren) {
	return (
		<NuqsAdapter>
			<TooltipProvider>
				<ApolloWrapper>
					{children}
					<Toaster />
				</ApolloWrapper>
			</TooltipProvider>
		</NuqsAdapter>
	)
}
