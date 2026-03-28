import { Skeleton } from '@/shared/components/ui/skeleton'

export function ProfileSkeleton() {
	return (
		<div className="w-full space-y-6 rounded-2xl bg-white p-5">
			{/* Header */}
			<div className="flex justify-between">
				<Skeleton className="h-7 w-52" />
				<div className="flex gap-2">
					<Skeleton className="h-9 w-20 rounded-full" />
					<Skeleton className="h-9 w-28 rounded-full" />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8">
				{/* General Info */}
				<div className="h-full space-y-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
					<Skeleton className="mb-5 h-5 w-36" />

					<div className="flex items-center gap-4">
						<Skeleton className="size-16 shrink-0 rounded-full" />
						<div className="flex-1 space-y-1.5">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-10 w-full rounded-2xl" />
						</div>
					</div>

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-10" />
						<Skeleton className="h-10 w-full rounded-2xl" />
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-14" />
							<Skeleton className="h-10 w-full rounded-2xl" />
						</div>
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-8" />
							<Skeleton className="h-10 w-full rounded-2xl" />
						</div>
					</div>

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-6" />
						<Skeleton className="h-24 w-full rounded-2xl" />
					</div>

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-8" />
						<Skeleton className="h-8 w-36 rounded-full" />
					</div>
				</div>

				{/* Body Measurements */}
				<div className="h-full space-y-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
					<Skeleton className="mb-5 h-5 w-40" />

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-14" />
						<Skeleton className="h-10 w-full rounded-2xl" />
					</div>

					{[
						['w-28', 'w-24'],
						['w-32', 'w-10'],
						['w-32', 'w-28']
					].map((widths, i) => (
						<div
							key={i}
							className="grid grid-cols-2 gap-3"
						>
							{widths.map((w, j) => (
								<div
									key={j}
									className="space-y-1.5"
								>
									<Skeleton className={`h-3 ${w}`} />
									<Skeleton className="h-10 w-full rounded-2xl" />
								</div>
							))}
						</div>
					))}

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-40" />
						<Skeleton className="h-10 w-full rounded-2xl" />
					</div>

					<div className="space-y-1.5">
						<Skeleton className="h-3 w-36" />
						<Skeleton className="h-10 w-full rounded-2xl" />
					</div>
				</div>
			</div>
		</div>
	)
}
