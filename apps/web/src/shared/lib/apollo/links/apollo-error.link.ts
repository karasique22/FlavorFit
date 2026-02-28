import { CombinedGraphQLErrors, Observable } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'

import { RefreshTokensDocument } from '@/__generated__/graphql'

import { simpleApolloClient } from '../SimpleApolloClient'

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
	if (CombinedGraphQLErrors.is(error)) {
		for (const err of error.errors) {
			if (err.extensions?.code === 'UNAUTHENTICATED') {
				return new Observable(observer => {
					simpleApolloClient
						.mutate({
							mutation: RefreshTokensDocument,
							fetchPolicy: 'no-cache'
						})
						.then(() => {
							forward(operation).subscribe(observer)
						})
						.catch(err => {
							observer.error(err)
						})
				})
			}
		}
	}
})
