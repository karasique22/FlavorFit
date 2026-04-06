import { Book, Star } from 'lucide-react'

import { RecipesCarousel } from '@/features/recipes-carousel/RecipesCarousel'

export function RecipesCatalog() {
	return (
		<div>
			<RecipesCarousel
				Icon={Book}
				title="Recommended"
			/>

			<RecipesCarousel
				Icon={Star}
				title="Popular"
			/>
		</div>
	)
}
