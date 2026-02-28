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

interface VerificationEmailProps {
	url: string
}

export function VerificationEmail({ url }: VerificationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Подтвердите ваш email адрес</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logoSection}>
						<Text style={logo}>F</Text>
					</Section>
					<Heading style={heading}>Подтверждение email</Heading>
					<Text style={text}>
						Спасибо за регистрацию в FlavorFit! Нажмите кнопку ниже, чтобы
						подтвердить ваш email адрес.
					</Text>
					<Section style={buttonSection}>
						<Button style={button} href={url}>
							Подтвердить email
						</Button>
					</Section>
					<Hr style={hr} />
					<Text style={footer}>
						Если вы не регистрировались, просто проигнорируйте это письмо.
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

export default VerificationEmail

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
