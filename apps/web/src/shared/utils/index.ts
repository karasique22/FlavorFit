import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const toOptionalNumber = (value: unknown) =>
	value === '' || value == null ? null : Number(value)
