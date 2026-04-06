import { cva } from 'class-variance-authority'

export const recipeCardVariants = cva(
	'bg-card rounded-2xl shadow-sm overflow-hidden flex flex-col',
	{
		variants: {
			size: {
				md: '',
				sm: ''
			}
		},
		defaultVariants: { size: 'md' }
	}
)

export const recipeCardBodyVariants = cva('flex flex-col', {
	variants: {
		size: {
			md: 'p-3 gap-2',
			sm: 'p-2.5 gap-1.5'
		}
	},
	defaultVariants: { size: 'md' }
})

export const recipeCardImageVariants = cva('relative w-full overflow-hidden', {
	variants: {
		size: {
			md: 'h-48',
			sm: 'h-32'
		}
	},
	defaultVariants: { size: 'md' }
})

export const recipeCardTitleVariants = cva(
	'font-semibold text-card-foreground leading-tight',
	{
		variants: {
			size: {
				md: 'text-base',
				sm: 'text-sm'
			}
		},
		defaultVariants: { size: 'md' }
	}
)

export const recipeCardDescriptionVariants = cva(
	'text-muted-foreground line-clamp-2 leading-snug',
	{
		variants: {
			size: {
				md: 'text-sm',
				sm: 'text-xs'
			}
		},
		defaultVariants: { size: 'md' }
	}
)

export const recipeCardBadgeVariants = cva(
	'inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground font-medium',
	{
		variants: {
			size: {
				md: 'px-2.5 py-1 text-xs',
				sm: 'px-2 py-0.5 text-xs'
			}
		},
		defaultVariants: { size: 'md' }
	}
)

export const recipeCardFooterVariants = cva(
	'flex items-center justify-between',
	{
		variants: {
			size: {
				md: 'mt-1',
				sm: 'mt-0.5'
			}
		},
		defaultVariants: { size: 'md' }
	}
)

export const recipeCardDifficultyVariants = cva(
	'inline-flex items-center gap-1 rounded-full font-medium',
	{
		variants: {
			size: {
				md: 'px-2.5 py-1 text-xs',
				sm: 'px-2 py-0.5 text-xs'
			},
			difficulty: {
				Easy: 'bg-success/15 text-success',
				Medium: 'bg-accent/20 text-accent-dark',
				Hard: 'bg-destructive/10 text-destructive'
			}
		},
		defaultVariants: { size: 'md', difficulty: 'Easy' }
	}
)

export const recipeCardMetaVariants = cva(
	'flex items-center gap-1 text-muted-foreground text-xs',
	{
		variants: {
			size: {
				md: 'gap-2',
				sm: 'gap-1'
			}
		},
		defaultVariants: { size: 'md' }
	}
)
