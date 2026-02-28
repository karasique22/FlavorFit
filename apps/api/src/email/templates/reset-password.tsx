import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text
} from '@react-email/components'

interface ResetPasswordEmailProps {
	url: string
}

export function ResetPasswordEmail({ url }: ResetPasswordEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Сброс пароля вашего аккаунта</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logoSection}>
						<Text style={logo}>F</Text>
					</Section>
					<Heading style={heading}>Сброс пароля</Heading>
					<Text style={text}>
						Мы получили запрос на сброс пароля для вашего аккаунта FlavorFit.
						Нажмите кнопку ниже, чтобы создать новый пароль.
					</Text>
					<Section style={buttonSection}>
						<Button style={button} href={url}>
							Сбросить пароль
						</Button>
					</Section>
					<Hr style={hr} />
					<Text style={footer}>
						Ссылка действительна 1 час. Если вы не запрашивали сброс пароля,
						просто проигнорируйте это письмо.
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

export default ResetPasswordEmail

const main = {
	backgroundColor: '#f3f4f6',
	fontFamily:
		'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
}

const container = {
	backgroundColor: '#ffffff',
	margin: '40px auto',
	padding: '40px',
	borderRadius: '10px',
	maxWidth: '560px'
}

const logoSection = {
	textAlign: 'center' as const,
	marginBottom: '24px'
}

const logo = {
	display: 'inline-block',
	width: '48px',
	height: '48px',
	lineHeight: '48px',
	textAlign: 'center' as const,
	fontSize: '24px',
	fontWeight: '700',
	color: '#ffffff',
	backgroundColor: '#9779fc',
	borderRadius: '50%',
	margin: '0'
}

const heading = {
	fontSize: '24px',
	fontWeight: '600',
	color: '#111111',
	margin: '0 0 16px',
	textAlign: 'center' as const
}

const text = {
	fontSize: '16px',
	lineHeight: '24px',
	color: '#5c6473',
	margin: '0 0 24px',
	textAlign: 'center' as const
}

const buttonSection = {
	textAlign: 'center' as const,
	margin: '32px 0'
}

const button = {
	backgroundColor: '#9779fc',
	borderRadius: '8px',
	color: '#ffffff',
	fontSize: '16px',
	fontWeight: '600',
	padding: '12px 32px',
	textDecoration: 'none',
	display: 'inline-block'
}

const hr = {
	borderColor: '#e5e7eb',
	margin: '32px 0 24px'
}

const footer = {
	fontSize: '13px',
	color: '#9ca3af',
	margin: '0',
	textAlign: 'center' as const
}
