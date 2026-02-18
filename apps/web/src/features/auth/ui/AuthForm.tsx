'use client'

interface Props {
	type: 'login' | 'register'
}

export function AuthForm({ type }: Props) {
	return (
		<div>
			<h1>{type === 'register' ? 'Register' : 'Login'}</h1>

			<form>
				<input
					type="email"
					placeholder="Email"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					required
				/>
				<button type="submit">
					{type === 'register' ? 'Register' : 'Login'}
				</button>
			</form>
		</div>
	)
}
