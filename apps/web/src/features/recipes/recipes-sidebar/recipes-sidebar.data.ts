import { Apple, ChefHat, Globe, Sparkles, Star } from 'lucide-react'

import { SidebarCollapsibleItem } from '@/shared/components/custom-ui/sidebar-collapsable/sidebar-collapsible.types'

// TODO: replace with API data
export const recipesSidebarFilters: SidebarCollapsibleItem[] = [
	{
		label: 'Meal Type',
		icon: ChefHat,
		items: [
			{ label: 'Breakfast', value: 'breakfast' },
			{ label: 'Lunch', value: 'lunch', count: 1 },
			{ label: 'Dinner', value: 'dinner' },
			{ label: 'Snacks', value: 'snacks' },
			{ label: 'Desserts', value: 'desserts' },
			{ label: 'Drinks', value: 'drinks' }
		]
	},
	{
		label: 'Dietary Preferences',
		icon: Apple,
		items: [
			{ label: 'Vegetarian', value: 'vegetarian' },
			{ label: 'Low-Carb', value: 'low-carb', count: 2 },
			{ label: 'Gluten-Free', value: 'gluten-free' },
			{ label: 'Keto', value: 'keto' },
			{ label: 'Dairy-Free', value: 'dairy-free' }
		]
	},
	{
		label: 'Health Goals',
		icon: Star,
		items: [
			{ label: 'Weight Loss', value: 'weight-loss' },
			{ label: 'Muscle Gain', value: 'muscle-gain' },
			{ label: 'Balanced Diet', value: 'balanced-diet' }
		]
	},
	{
		label: 'Cuisine',
		icon: Globe,
		items: [
			{ label: 'Italian', value: 'italian' },
			{ label: 'Asian', value: 'asian' },
			{ label: 'Mexican', value: 'mexican' }
		]
	},
	{
		label: 'Special Occasions',
		icon: Sparkles,
		items: [
			{ label: 'Holiday', value: 'holiday' },
			{ label: 'Birthday', value: 'birthday' },
			{ label: 'Anniversary', value: 'anniversary' }
		]
	}
]
