import Link from 'next/link'

import { PAGES } from '@/shared/config/page.config'

interface Props {
	isLogin: boolean
}

export function AuthToggleForm({ isLogin }: Props) {
	return (
		<div className="mt-5 text-center text-sm text-gray-300">
			{isLogin ? (
				<div>
					Don`t have an account?{' '}
					<Link
						className="link-simple"
						href={PAGES.REGISTER}
					>
						Register
					</Link>
				</div>
			) : (
				<div>
					Already have an account?{' '}
					<Link
						className="link-simple"
						href={PAGES.LOGIN}
					>
						Login
					</Link>
				</div>
			)}
		</div>
	)
}
