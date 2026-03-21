import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
	Icon: LucideIcon
	children?: ReactNode
}

export function HeadingWithIcon({ Icon, children }: Props) {
	return (
		<>
			<div className="flex items-center gap-2">
				<Icon
					size={24}
					className="opacity-50"
				/>
				<h1 className="text-xl font-semibold">{children}</h1>
			</div>
		</>
	)
}
