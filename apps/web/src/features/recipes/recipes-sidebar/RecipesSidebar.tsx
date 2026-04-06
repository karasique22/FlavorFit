import { Search } from 'lucide-react'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { SidebarCollapsible } from '@/shared/components/custom-ui/sidebar-collapsable/SidebarCollapsible'

import { recipesSidebarFilters } from './recipes-sidebar.data'

interface Props {
	search: string
	setSearch: (value: string) => void
	activeFilters: string[]
	toggleFilter: (filter: string) => void
}

export function RecipesSidebar({
	search,
	setSearch,
	activeFilters,
	toggleFilter
}: Props) {
	return (
		<div className="flex flex-col rounded-3xl bg-white p-3">
			<FieldInput
				icon={Search}
				placeholder="Search by recipes"
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>

			<div className="scrollbar-none -mx-1 min-h-0 flex-1 overflow-y-auto mask-[linear-gradient(to_bottom,black_calc(98%-20px),transparent)] mask-size-[100%_100%] mask-no-repeat px-1">
				<SidebarCollapsible
					data={recipesSidebarFilters}
					activeFilters={activeFilters}
					onFilterToggle={toggleFilter}
				/>
			</div>
		</div>
	)
}
