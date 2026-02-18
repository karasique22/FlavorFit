import { HttpLink } from '@apollo/client'

import { GRAPHQL_SERVER_URL } from '@/shared/config/api.config'

export const httpLink = new HttpLink({
	uri: GRAPHQL_SERVER_URL,
	credentials: 'include',
	fetchOptions: {
		next: {
			revalidate: 60
		}
	}
})
