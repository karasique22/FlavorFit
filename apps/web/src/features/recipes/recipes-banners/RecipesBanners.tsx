import { ShareBanner } from './ShareBanner'
import { UserReceipts } from './UserReceipts'

export function RecipesBanners() {
	return (
		<div className="mb-6 grid w-full grid-cols-[3fr_1fr] gap-4">
			<ShareBanner />
			<UserReceipts />
		</div>
	)
}
