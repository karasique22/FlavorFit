import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'

import { RecipesDashboard } from '@/features/recipes/RecipesDashboard'

export const metadata: Metadata = {
	title: 'Recipes',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <RecipesDashboard />
}
