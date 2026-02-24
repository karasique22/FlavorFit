'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { NavMenuItem } from './NavMenuItem'
import type { MenuItem } from './nav-menu.types'

interface Props {
	menu: MenuItem[]
}

export function NavMenu({ menu }: Props) {
	const pathname = usePathname()

	return (
		<nav className="flex items-center gap-2">
			{menu.map(item => (
				<NavMenuItem
					key={item.label}
					menuItem={item}
					isActive={!!match(item.href)(pathname)}
				/>
			))}
		</nav>
	)
}
