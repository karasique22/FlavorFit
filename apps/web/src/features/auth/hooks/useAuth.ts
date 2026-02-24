import { useQuery } from '@apollo/client/react'

import { MeDocument } from '@/__generated__/graphql'

export function useAuth() {
	const { data, loading, error } = useQuery(MeDocument, {})
	return {
		user: data?.me,
		isLoading: loading,
		isLoggedIn: !!data?.me,
		error
	}
}
