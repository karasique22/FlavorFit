import { useLayoutEffect, useRef, useState } from 'react'

export function useOverflowCount(totalCount: number) {
	const containerRef = useRef<HTMLDivElement>(null)
	const itemRefs = useRef<(HTMLDivElement | null)[]>([])
	const [visibleCount, setVisibleCount] = useState(totalCount)

	useLayoutEffect(() => {
		const container = containerRef.current
		if (!container) return

		// getBoundingClientRect возвращает координаты элемента относительно viewport
		// .right - x-координата правого края в пикселях от левого края экрана
		const containerRight = container.getBoundingClientRect().right
		const items = itemRefs.current.filter(Boolean) as HTMLDivElement[]

		// Элемент влезает если его правый край не выходит за правый край контейнера
		const visible = items.filter(
			el => el.getBoundingClientRect().right <= containerRight
		).length
		setVisibleCount(visible)
	}, [totalCount])

	return { containerRef, itemRefs, visibleCount }
}
