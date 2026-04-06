import { LucideIcon } from 'lucide-react'

import { HeadingWithIcon } from '@/shared/components/custom-ui/heading-with-icon/HeadingWithIcon'
import { RecipeCard } from '@/shared/components/custom-ui/recipe-card/RecipeCard'

import { Difficulty } from '@/__generated__/graphql'

interface Props {
	Icon: LucideIcon
	title: string
}

// FIXME: MOCK
const MOCK_RECIPES = [
	{
		id: '1',
		title: 'Smoothie Bowl',
		description:
			'Learn how to make the best smoothie bowl recipe with 5 ingredients in 5 minutes!',
		imageUrl:
			'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
		calories: 220,
		cookTimeMinutes: 5,
		difficulty: Difficulty.Easy,
		likesCount: 21800,
		views: 156100,
		dishType: { id: '1', name: 'Bowl', slug: 'bowl' }
	},
	{
		id: '2',
		title: 'Mushroom Quiche',
		description:
			'This crustless salmon, spinach and mushroom quiche is easy to make.',
		imageUrl:
			'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
		calories: 354,
		cookTimeMinutes: 45,
		difficulty: Difficulty.Medium,
		likesCount: 21800,
		views: 156100,
		dishType: { id: '2', name: 'Main dish', slug: 'main-dish' }
	},
	{
		id: '3',
		title: 'Spinach Breakfast Taco',
		description: "It doesn't get easier than this healthy breakfast taco.",
		imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
		calories: 189,
		cookTimeMinutes: 15,
		difficulty: Difficulty.Hard,
		likesCount: 7100,
		views: 156100,
		dishType: { id: '3', name: 'Wrap', slug: 'wrap' }
	}
]

export function RecipesCarousel({ Icon, title }: Props) {
	return (
		<div className="mb-8">
			<HeadingWithIcon Icon={Icon}>{title}</HeadingWithIcon>
			<div className="mt-4 flex gap-4">
				{MOCK_RECIPES.map(recipe => (
					<div
						key={recipe.id}
						className="w-64 shrink-0"
					>
						<RecipeCard recipe={recipe} />
					</div>
				))}
			</div>
		</div>
	)
}
