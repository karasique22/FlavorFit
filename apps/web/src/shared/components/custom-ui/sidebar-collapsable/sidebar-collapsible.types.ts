import type { SelectOption } from '@/shared/types'
import type { LucideIcon } from 'lucide-react'

export interface SidebarCollapsibleSubItem extends SelectOption {
	count?: number
}

export interface SidebarCollapsibleItem extends SelectOption {
	icon?: LucideIcon
	items: SidebarCollapsibleSubItem[]
}
