'use client'

import { ApolloLink } from '@apollo/client'
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache
} from '@apollo/client-integration-nextjs'

import { httpLink } from '@/shared/lib/apollo/links/apollo-http.link'

function makeClient() {
	return new ApolloClient({
		link: ApolloLink.from([httpLink]),
		cache: new InMemoryCache(),
		devtools: {
			enabled: true
		}
	})
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	)
}
