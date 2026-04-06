'use client'

import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import { useDebounce } from '@/shared/hooks/useDebounce'

import { RecipesBanners } from './recipes-banners/RecipesBanners'
import { RecipesCatalog } from './recipes-catalog/RecipesCatalog'
import { RecipesSidebar } from './recipes-sidebar/RecipesSidebar'

export function RecipesDashboard() {
	const [search, setSearch] = useQueryState('q', {
		defaultValue: ''
	})

	const [activeFilters, setActiveFilters] = useQueryState(
		'f',
		parseAsArrayOf(parseAsString).withDefault([])
	)

	const toggleFilter = (filter: string) => {
		setActiveFilters(prev =>
			prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
		)
	}

	const debouncedSearch = useDebounce(search)

	return (
		<div className="grid min-h-full w-full grid-cols-[1fr_5fr] gap-8">
			<RecipesSidebar
				search={search}
				setSearch={setSearch}
				activeFilters={activeFilters}
				toggleFilter={toggleFilter}
			/>
			<main className="min-w-0">
				<RecipesBanners />
				<RecipesCatalog />
			</main>
		</div>
	)
}
