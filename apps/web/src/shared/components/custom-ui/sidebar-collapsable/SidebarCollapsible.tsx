import { cn } from '@/shared/utils'
import { ChevronDown, CornerDownRight } from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/shared/components/ui/collapsible'

import { Button } from '../../ui/button'
import { SidebarCollapsibleItem } from './sidebar-collapsible.types'

interface Props {
	data: SidebarCollapsibleItem[]
	activeFilters?: string[]
	onFilterToggle?: (filter: string) => void
}

export function SidebarCollapsible({
	data,
	activeFilters,
	onFilterToggle
}: Props) {
	return (
		<div className="space-y-1.5 py-4">
			{data.map((item, index) => (
				<Collapsible
					className="flex flex-col"
					key={index}
					defaultOpen={index === 0}
				>
					<CollapsibleTrigger asChild>
						<Button
							className={cn(
								'group flex w-full items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-300',
								activeFilters?.some(filter =>
									item.items.some(subItem => subItem.value === filter)
								) && 'bg-accent'
							)}
							variant={'ghost'}
						>
							{item.icon && <item.icon className="size-5" />}
							<span>{item.label}</span>
							<ChevronDown className="ml-auto size-5 transition-transform group-data-[state=open]:-rotate-180" />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="mr-2 ml-4 flex flex-col py-2 text-sm text-gray-500/80">
						{item.items.map((subItem, subIndex) => (
							<button
								className={cn(
									'flex items-center gap-1.5 rounded-full p-1.5 hover:bg-gray-100',
									activeFilters?.includes(subItem.value) && 'text-black'
								)}
								key={subIndex}
								onClick={() => onFilterToggle?.(subItem.value)}
							>
								<div className="flex items-center gap-1.5">
									<CornerDownRight
										strokeWidth={1.5}
										size={18}
									/>
									<span>{subItem.label}</span>
								</div>
								{subItem.count && (
									<span className="ml-auto rounded-full bg-red-200 px-1.5 py-0.5 text-xs font-medium text-red-800">
										+{subItem.count}
									</span>
								)}
							</button>
						))}
					</CollapsibleContent>
				</Collapsible>
			))}
		</div>
	)
}
