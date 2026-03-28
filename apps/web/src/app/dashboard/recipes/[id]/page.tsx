import type { Metadata } from 'next'

import { RecipeDetails } from '@/features/recipe/RecipeDetails'

export async function generateMetadata({
	params
}: {
	params: { slug: string }
}): Promise<Metadata> {
	// const recipe = await getData(params.slug)
	return { title: 'Recipe' }
}

export default function Page() {
	return <RecipeDetails />
}
