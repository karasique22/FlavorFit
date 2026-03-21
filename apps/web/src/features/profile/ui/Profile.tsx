'use client'

import { useQuery } from '@apollo/client/react'

import { GetProfileDocument } from '@/__generated__/graphql'

import { ProfileForm } from './ProfileForm'
import { ProfileSkeleton } from './ProfileSkeleton'

export function Profile() {
	const { data, loading } = useQuery(GetProfileDocument)
	console.log('Profile data:', data)

	if (loading || !data?.me) {
		return <ProfileSkeleton />
	}

	return <ProfileForm data={data} />
}
