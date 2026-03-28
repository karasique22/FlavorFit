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
}

export function SidebarCollapsible({ data }: Props) {
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
							className="group text-md flex items-center rounded-full p-3"
							variant={'ghost'}
						>
							{item.icon && <item.icon className="size-5" />}
							<span>{item.label}</span>
							<ChevronDown className="ml-auto size-5 transition-transform group-data-[state=open]:-rotate-180" />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className="mr-2 ml-5 flex flex-col gap-2 py-2 text-sm text-gray-500/80">
						{item.items.map((subItem, subIndex) => (
							<button
								className="flex items-center gap-1.5"
								key={subIndex}
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
