import Image from 'next/image'

import { recipeCardImageVariants } from '../styles/recipe-card.styles'
import { RecipeCardSize } from '../types/recipe-card.types'

interface Props {
	// FIXME: ?
	src: string
	alt: string
	size: RecipeCardSize
}

export function RecipeCardImage({ src, alt, size }: Props) {
	return (
		<div className={recipeCardImageVariants({ size })}>
			<Image
				className="object-cover transition-transform duration-200 will-change-transform group-hover:scale-105"
				src={src}
				alt={alt}
				fill
				sizes={
					size === 'sm'
						? '(max-width: 768px): 100vw, 280px'
						: size === 'md'
							? '(max-width: 768px): 100vw, 360px'
							: '(max-width: 768px): 100vw, 480px'
				}
			/>
		</div>
	)
}
