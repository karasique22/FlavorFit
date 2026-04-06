import { LucideIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { recipeCardBadgeVariants } from '../styles/recipe-card.styles'
import { RecipeCardSize } from '../types/recipe-card.types'

interface Props extends PropsWithChildren {
	Icon?: LucideIcon
	size: RecipeCardSize
}

export function RecipeCardBadge({ Icon, size, children }: Props) {
	return (
		<div className={recipeCardBadgeVariants({ size })}>
			{Icon && (
				<Icon
					className={
						size === 'sm' ? 'size-3' : size === 'md' ? 'size-4' : 'size-5'
					}
					size={16}
				/>
			)}
			{children}
		</div>
	)
}
