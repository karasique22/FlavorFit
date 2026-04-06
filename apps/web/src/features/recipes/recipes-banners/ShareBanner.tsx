import { Plus } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/shared/components/ui/button'

const tags = ['Gain Recognition', 'Inspire Others', 'Showcase Your Skills']

export function ShareBanner() {
	return (
		<div className="to-primary from-primary-dark relative flex items-center justify-between rounded-2xl bg-linear-to-r py-5 pr-8 pl-45">
			<Image
				className="absolute -left-5 -scale-x-100 -rotate-25 object-contain drop-shadow-lg"
				src="/images/mascots/burger.png"
				alt="Burger mascot"
				width={170}
				height={170}
				draggable={false}
			/>

			<div className="flex flex-col justify-between gap-6 self-stretch">
				<div className="space-y-1">
					<h2 className="text-4xl font-bold text-white italic">
						Got a Recipe That Rocks?
					</h2>
					<p className="text-sm text-white/80">
						Share It & Shine! Your recipe might just become the next big hit!
					</p>
				</div>
				<div className="flex gap-2">
					{tags.map(tag => (
						<span
							key={tag}
							className="rounded-sm bg-white/20 px-3 py-1 text-xs font-medium text-white"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			<Button
				variant="outline"
				className="text-primary-dark shrink-0 gap-1.5 self-start rounded-full border-white bg-white text-sm font-semibold"
			>
				<Plus size={16} />
				Add Recipe
			</Button>
		</div>
	)
}
