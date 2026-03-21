import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
	reactCompiler: isProd,
	env: {
		JWT_SECRET: process.env.JWT_SECRET
	},
	images: {
		remotePatterns: [
			{ hostname: 'www.gravatar.com' },
			{
				hostname: new URL(
					process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4200'
				).hostname
			}
		]
	}
}

export default nextConfig
