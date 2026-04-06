export function formatCompactNumber(num?: number | null): string {
	if (!num) return '0'

	return new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 1
	}).format(num)
}
