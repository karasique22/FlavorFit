import { Search } from 'lucide-react'

import { FieldInput } from '@/shared/components/custom-ui/field-input/FieldInput'
import { SidebarCollapsible } from '@/shared/components/custom-ui/sidebar-collapsable/SidebarCollapsible'

import { recipesSidebarFilters } from './recipes-sidebar.data'

export function RecipesSidebar() {
	return (
		<div className="rounded-3xl bg-white p-3">
			<FieldInput
				icon={Search}
				placeholder="Search by recipes"
			/>

			<SidebarCollapsible data={recipesSidebarFilters} />
		</div>
	)
}
