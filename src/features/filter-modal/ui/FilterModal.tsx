import { useEffect, useMemo, useState } from 'react'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFiltersQuery } from '@/shared/api/useFiltersQuery'

import {
	createDraftFromSelectedFilters,
	createSearchRequestFilters
} from '../model/filterMappers'
import { DraftFilters } from '../model/types'
import { FilterConfirmDialog } from './FilterConfirmDialog'
import { FilterModalFilters } from './FilterModalFilters'
import { FilterModalFooter } from './FilterModalFooter'
import { FilterModalHeader } from './FilterModalHeader'

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
	const { data, isLoading, isError, refetch } = useFiltersQuery()
	const filterItems = data?.filterItems ?? []
	const [draftFilters, setDraftFilters] = useState<DraftFilters>(() =>
		createDraftFromSelectedFilters(initialValue, data?.filterItems)
	)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return
			}

			if (isConfirmOpen) {
				setIsConfirmOpen(false)

				return
			}

			onClose()
		}

		window.addEventListener('keydown', handleEscape)

		return () => window.removeEventListener('keydown', handleEscape)
	}, [isConfirmOpen, onClose])

	const selectedFilters = useMemo(
		() => createSearchRequestFilters(filterItems, draftFilters),
		[draftFilters, filterItems]
	)

	const toggleOption = (filterId: string, optionId: string) => {
		setDraftFilters(currentDraft => {
			const selectedOptions = currentDraft[filterId] ?? []
			const nextSelectedOptions = selectedOptions.includes(optionId)
				? selectedOptions.filter(
						selectedOptionId => selectedOptionId !== optionId
					)
				: [...selectedOptions, optionId]

			return {
				...currentDraft,
				[filterId]: nextSelectedOptions
			}
		})
	}

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
		onApply(selectedFilters)
		setIsConfirmOpen(false)
		onClose()
	}

	return (
		<div
			aria-labelledby="filter-modal-title"
			aria-modal="true"
			className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
			role="dialog"
		>
			<section className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
				<FilterModalHeader onClose={onClose} />

				<div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
					<FilterModalFilters {...filterModalState} />
				</div>

				<FilterModalFooter
					applyDisabled={filterModalState.state !== 'ready'}
					onApply={() => setIsConfirmOpen(true)}
					onClose={onClose}
				/>
			</section>

			{isConfirmOpen && (
				<FilterConfirmDialog
					onCancel={() => setIsConfirmOpen(false)}
					onConfirm={handleConfirm}
				/>
			)}
		</div>
	)
}
