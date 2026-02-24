import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
	reactCompiler: isProd,
	images: {
		domains: ['www.gravatar.com']
	}
}

export default nextConfig
