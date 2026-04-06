import { Eye, Heart } from 'lucide-react'

import { formatCompactNumber } from '@/shared/utils/formatCompactNumber'

import { recipeCardMetaVariants } from '../styles/recipe-card.styles'
import { RecipeCardData, RecipeCardSize } from '../types/recipe-card.types'

interface Props {
	recipe: RecipeCardData
	size: RecipeCardSize
}

export function RecipeCardStats({ recipe, size }: Props) {
	return (
		<div className={recipeCardMetaVariants({ size })}>
			<div className="flex items-center gap-1">
				<Heart className="size-4" />
				<span>{formatCompactNumber(recipe.likesCount)}</span>
			</div>
			<div className="flex items-center gap-1">
				<Eye className="size-4" />
				<span>{formatCompactNumber(recipe.views)}</span>
			</div>
		</div>
	)
}
