import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
	reactCompiler: isProd,
	env: {
		JWT_SECRET: process.env.JWT_SECRET
	},
	images: {
		domains: ['www.gravatar.com']
	}
}

export default nextConfig
