import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	ignoreNoDocuments: true,
	schema: 'http://localhost:4200/graphql',
	documents: ['src/shared/graphql/**/*.graphql', 'src/features/**/*.graphql'],
	generates: {
		'src/__generated__/output.ts': {
			plugins: [
				{ add: { content: '/* eslint-disable */' } },
				'typescript',
				'typescript-operations',
				'typescript-react-apollo'
			],
			config: {
				enumsAsConst: true
			}
		},
		'schema.json': {
			plugins: ['introspection']
		}
	}
}

export default config
