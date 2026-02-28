import {
	ApolloLink,
	ApolloClient as BaseApolloClient,
	InMemoryCache
} from '@apollo/client'
import {
	ApolloClient,
	InMemoryCache as NextInMemoryCache,
	registerApolloClient
} from '@apollo/client-integration-nextjs'

import { httpLink } from './links/apollo-http.link'

// Server Components
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		link: ApolloLink.from([httpLink]),
		cache: new NextInMemoryCache(),
		devtools: {
			enabled: true
		}
	})
})

export const serverApolloClient = new BaseApolloClient({
	link: ApolloLink.from([httpLink]),
	cache: new InMemoryCache(),
	devtools: {
		enabled: true
	},
	ssrMode: true,
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache'
		}
	}
})
