import { cn } from '@/shared/utils'
import Link from 'next/link'

import { MenuItem } from './nav-menu.types'

interface Props {
	menuItem: MenuItem
	isActive: boolean
}

export function NavMenuItem({ menuItem, isActive }: Props) {
	return (
		<Link
			href={menuItem.href}
			className={cn(
				'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',

				isActive
					? 'bg-muted-dark text-white'
					: 'bg-muted hover:bg-muted-dark text-muted-foreground hover:text-white'
			)}
		>
			<menuItem.icon />
			<span>{menuItem.label}</span>
		</Link>
	)
}
