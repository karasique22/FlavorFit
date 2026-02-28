import { randomBytes } from 'node:crypto'

export function generateToken(length: number = 32): string {
	return randomBytes(length).toString('hex')
}
