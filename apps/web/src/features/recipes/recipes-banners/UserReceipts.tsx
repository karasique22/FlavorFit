import { ForkKnife } from 'lucide-react'
import Image from 'next/image'

export function UserReceipts() {
	return (
		<div className="flex flex-col justify-between gap-3 rounded-2xl bg-white px-4 py-6">
			<div className="flex items-center gap-2">
				<ForkKnife
					size={20}
					className="opacity-60"
				/>
				<span className="text-md font-semibold">Your Recipes</span>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex items-baseline gap-1">
					<span className="text-foreground text-4xl font-black italic">12</span>
					<span className="text-muted-foreground text-sm">Created</span>
				</div>

				<div className="flex -space-x-2">
					{Array.from({ length: 3 }).map((_, i) => (
						<Image
							key={i}
							src="/images/mascots/burger.png"
							alt="Burger mascot"
							width={32}
							height={32}
							className="bg-muted size-8 rounded-full border-2 border-white"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
