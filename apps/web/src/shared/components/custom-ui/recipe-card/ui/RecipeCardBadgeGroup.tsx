import { Clock4, Flame } from 'lucide-react'

import { useOverflowCount } from '@/shared/hooks/useOverflowCount'

import { RecipeCardData, RecipeCardSize } from '../types/recipe-card.types'
import { RecipeCardBadge } from './RecipeCardBadge'

interface Props {
	recipe: RecipeCardData
	size: RecipeCardSize
}

const buildBadges = (recipe: RecipeCardData, size: RecipeCardSize) =>
	[
		recipe.dishType?.name && (
			<RecipeCardBadge size={size}>{recipe.dishType.name}</RecipeCardBadge>
		),
		recipe.calories != null && (
			<RecipeCardBadge
				size={size}
				Icon={Flame}
			>
				{recipe.calories} kcal
			</RecipeCardBadge>
		),
		recipe.cookTimeMinutes != null && (
			<RecipeCardBadge
				size={size}
				Icon={Clock4}
			>
				{recipe.cookTimeMinutes} min
			</RecipeCardBadge>
		)
	].filter(Boolean)

export function RecipeCardBadgeGroup({ recipe, size }: Props) {
	const badges = buildBadges(recipe, size)
	const { containerRef, itemRefs, visibleCount } = useOverflowCount(
		badges.length
	)

	const hiddenCount = badges.length - visibleCount

	return (
		<div
			ref={containerRef}
			className="flex items-center gap-2 overflow-hidden"
		>
			{badges.map((badge, i) => (
				<div
					key={i}
					ref={el => {
						itemRefs.current[i] = el
					}}
					className={i >= visibleCount ? 'invisible absolute' : undefined}
				>
					{badge}
				</div>
			))}
			{hiddenCount > 0 && (
				<RecipeCardBadge size={size}>+{hiddenCount}</RecipeCardBadge>
			)}
		</div>
	)
}
