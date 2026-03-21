import { SERVER_URL } from '@/shared/config/api.config'

export function resolveAvatarSrc(avatarUrl?: string | null): string {
	if (!avatarUrl) return '/images/avatar-placeholder.png'
	if (avatarUrl.startsWith('http')) return avatarUrl
	return `${SERVER_URL}${avatarUrl}`
}
