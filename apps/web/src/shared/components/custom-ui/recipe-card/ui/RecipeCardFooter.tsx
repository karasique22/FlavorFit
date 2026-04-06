import { ChefHat } from 'lucide-react'

import { Difficulty } from '@/__generated__/graphql'

import {
	recipeCardDifficultyVariants,
	recipeCardFooterVariants
} from '../styles/recipe-card.styles'
import { RecipeCardData, RecipeCardSize } from '../types/recipe-card.types'
import { RecipeCardStats } from './RecipeCardStats'

interface Props {
	recipe: RecipeCardData
	size: RecipeCardSize
}

const DIFFICULTY_LABEL = {
	[Difficulty.Easy]: 'Easy',
	[Difficulty.Medium]: 'Medium',
	[Difficulty.Hard]: 'Hard'
} as const

const DIFFICULTY_ICONS: Record<Difficulty, number> = {
	[Difficulty.Easy]: 1,
	[Difficulty.Medium]: 2,
	[Difficulty.Hard]: 3
}

export function RecipeCardFooter({ recipe, size }: Props) {
	const label = DIFFICULTY_LABEL[recipe.difficulty]

	return (
		<div className={recipeCardFooterVariants({ size })}>
			<div
				className={recipeCardDifficultyVariants({ size, difficulty: label })}
			>
				{Array.from({ length: DIFFICULTY_ICONS[recipe.difficulty] }).map(
					(_, i) => (
						<ChefHat
							key={i}
							className="size-3.5"
						/>
					)
				)}
				{label}
			</div>
			<RecipeCardStats
				recipe={recipe}
				size={size}
			/>
		</div>
	)
}
