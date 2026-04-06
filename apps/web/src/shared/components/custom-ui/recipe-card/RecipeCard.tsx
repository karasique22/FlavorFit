import { recipeCardBodyVariants, recipeCardDescriptionVariants, recipeCardTitleVariants, recipeCardVariants } from './styles/recipe-card.styles'
import { RecipeCardData, RecipeCardSize } from './types/recipe-card.types'
import { RecipeCardBadgeGroup } from './ui/RecipeCardBadgeGroup'
import { RecipeCardFooter } from './ui/RecipeCardFooter'
import { RecipeCardImage } from './ui/RecipeCardImage'

interface Props {
	recipe: RecipeCardData
	size?: RecipeCardSize
}

export function RecipeCard({ recipe, size = 'md' }: Props) {
	return (
		<div className={recipeCardVariants({ size })}>
			{recipe.imageUrl && (
				<RecipeCardImage src={recipe.imageUrl} alt={recipe.title} size={size} />
			)}
			<div className={recipeCardBodyVariants({ size })}>
				<p className={recipeCardTitleVariants({ size })}>{recipe.title}</p>
				{recipe.description && (
					<p className={recipeCardDescriptionVariants({ size })}>{recipe.description}</p>
				)}
				<RecipeCardBadgeGroup recipe={recipe} size={size} />
				<RecipeCardFooter recipe={recipe} size={size} />
			</div>
		</div>
	)
}
