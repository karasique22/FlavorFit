export function formatEnum(value: string): string {
	return value.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
}
