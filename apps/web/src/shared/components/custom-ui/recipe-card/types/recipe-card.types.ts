import { VariantProps } from 'class-variance-authority'

import { Recipe } from '@/__generated__/graphql'

import { recipeCardVariants } from '../styles/recipe-card.styles'

export type RecipeCardSize = VariantProps<typeof recipeCardVariants>['size']

export type RecipeCardData = Pick<
	Recipe,
	| 'id'
	| 'title'
	| 'description'
	| 'imageUrl'
	| 'calories'
	| 'cookTimeMinutes'
	| 'difficulty'
	| 'likesCount'
	| 'views'
	| 'dishType'
>
