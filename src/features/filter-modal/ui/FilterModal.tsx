import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest'
import { useFiltersQuery } from '@/shared/api/useFiltersQuery'
import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll'
import { Dialog } from '@/shared/ui/Dialog'

import { useFilterDraft } from '../model/useFilterDraft'
import { FilterConfirmDialog } from './FilterConfirmDialog'
import { FilterModalFilters } from './FilterModalFilters'
import { FilterModalFooter } from './FilterModalFooter'
import { FilterModalHeader } from './FilterModalHeader'

type ConfirmMode = 'apply' | 'clear' | null

interface FilterModalProps {
	initialValue: SearchRequestFilter
	onApply: (filters: SearchRequestFilter) => void
	onClose: () => void
}

export const FilterModal = ({
	initialValue,
	onApply,
	onClose
}: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data, isLoading, isError, refetch } = useFiltersQuery()
	const filterItems = data?.filterItems ?? []
	const { draftFilters, isDirty, selectedFilters, toggleOption } =
		useFilterDraft(initialValue, filterItems)
	const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const applyButtonRef = useRef<HTMLButtonElement>(null)
	const clearButtonRef = useRef<HTMLButtonElement>(null)
	const wasConfirmOpenRef = useRef(false)
	const confirmTriggerRef = useRef<HTMLButtonElement | null>(null)
	const confirmFocusTargetRef = useRef<'trigger' | 'close' | null>(null)

	useLockBodyScroll(true)
	useFocusTrap(modalRef, !confirmMode)

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return
			}

			if (confirmMode) {
				setConfirmMode(null)

				return
			}

			onClose()
		}

		window.addEventListener('keydown', handleEscape)

		return () => window.removeEventListener('keydown', handleEscape)
	}, [confirmMode, onClose])

	useEffect(() => {
		closeButtonRef.current?.focus()
	}, [])

	useEffect(() => {
		if (confirmMode) {
			wasConfirmOpenRef.current = true

			return
		}

		if (wasConfirmOpenRef.current) {
			wasConfirmOpenRef.current = false
			if (confirmFocusTargetRef.current === 'trigger') {
				confirmTriggerRef.current?.focus()
			}

			if (confirmFocusTargetRef.current === 'close') {
				closeButtonRef.current?.focus()
			}

			confirmFocusTargetRef.current = null
		}
	}, [confirmMode])

	const filterModalState = isLoading
		? { state: 'loading' as const }
		: isError
			? { onRetry: () => void refetch(), state: 'error' as const }
			: filterItems.length === 0
				? { state: 'empty' as const }
				: {
						draftFilters,
						filterItems,
						onToggle: toggleOption,
						state: 'ready' as const
					}

	const handleConfirm = () => {
		if (confirmMode === 'clear') {
			confirmFocusTargetRef.current = 'close'
			onApply([])
			setConfirmMode(null)

			return
		}

		onApply(selectedFilters)
		setConfirmMode(null)
		onClose()
	}

	const handleClear = () => {
		confirmTriggerRef.current = clearButtonRef.current
		confirmFocusTargetRef.current = 'trigger'
		setConfirmMode('clear')
	}

	const handleApply = () => {
		confirmTriggerRef.current = applyButtonRef.current
		confirmFocusTargetRef.current = 'trigger'
		setConfirmMode('apply')
	}

	const confirmContent =
		confirmMode === 'clear'
			? {
					description: t('confirm.clear.description'),
					title: t('confirm.clear.title')
				}
			: {
					description: t('confirm.apply.description'),
					title: t('confirm.apply.title')
				}

	return (
		<Dialog
			ariaLabelledBy="filter-modal-title"
			overlayClassName="z-10 bg-black/40"
			overlayContent={
				confirmMode && (
					<FilterConfirmDialog
						description={confirmContent.description}
						title={confirmContent.title}
						onCancel={() => setConfirmMode(null)}
						onConfirm={handleConfirm}
					/>
				)
			}
			panelClassName="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden px-6 py-5"
			role="dialog"
			rootRef={modalRef}
		>
			<FilterModalHeader
				closeButtonRef={closeButtonRef}
				onClose={onClose}
			/>

			<div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
				<FilterModalFilters {...filterModalState} />
			</div>

			<FilterModalFooter
				applyDisabled={
					filterModalState.state !== 'ready' ||
					selectedFilters.length === 0 ||
					!isDirty
				}
				applyButtonRef={applyButtonRef}
				clearDisabled={
					filterModalState.state !== 'ready' || selectedFilters.length === 0
				}
				clearButtonRef={clearButtonRef}
				onApply={handleApply}
				onClear={handleClear}
			/>
		</Dialog>
	)
}
