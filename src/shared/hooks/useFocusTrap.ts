import { RefObject, useEffect } from 'react'

const focusableSelector = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(',')

const getFocusableElements = (container: HTMLElement) =>
	Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
		element => element.tabIndex >= 0
	)

export const useFocusTrap = (
	containerRef: RefObject<HTMLElement | null>,
	isActive: boolean
) => {
	useEffect(() => {
		if (!isActive) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') {
				return
			}

			const container = containerRef.current

			if (!container) {
				return
			}

			const focusableElements = getFocusableElements(container)

			if (focusableElements.length === 0) {
				event.preventDefault()
				container.focus()

				return
			}

			const firstFocusableElement = focusableElements[0]
			const lastFocusableElement =
				focusableElements[focusableElements.length - 1]
			const activeElement = document.activeElement

			if (
				event.shiftKey &&
				(activeElement === firstFocusableElement ||
					!container.contains(activeElement))
			) {
				event.preventDefault()
				lastFocusableElement.focus()

				return
			}

			if (
				!event.shiftKey &&
				(activeElement === lastFocusableElement ||
					!container.contains(activeElement))
			) {
				event.preventDefault()
				firstFocusableElement.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [containerRef, isActive])
}
