import { SERVER_URL } from '@/shared/config/api.config'

export async function uploadAvatar(file: File): Promise<string> {
	const formData = new FormData()
	formData.append('file', file)

	const res = await fetch(`${SERVER_URL}/media-upload/avatar`, {
		method: 'POST',
		body: formData,
		credentials: 'include'
	})

	if (!res.ok) throw new Error('Upload failed')

	const data = await res.json()
	return data.url
}
