import { useEffect, useMemo, useState } from 'react'

import { FilterItem } from '@/shared/api/types/Filter'
import {
	SearchRequestFilter,
	SearchRequestFilters
} from '@/shared/api/types/SearchRequest'

import {
	areSearchRequestFiltersEqual,
	createDraftFromSelectedFilters,
	createSearchRequestFilters
} from './filterMappers'
import { DraftFilterSelections } from './types'

interface UseFilterDraftResult {
	draftFilters: DraftFilterSelections
	isDirty: boolean
	selectedFilters: SearchRequestFilters
	toggleOption: (filterId: string, optionId: string) => void
}

export const useFilterDraft = (
	initialValue: SearchRequestFilter,
	filterItems: FilterItem[]
): UseFilterDraftResult => {
	const initialDraftFilters = useMemo(
		() => createDraftFromSelectedFilters(initialValue, filterItems),
		[initialValue, filterItems]
	)
	const [draftFilters, setDraftFilters] =
		useState<DraftFilterSelections>(initialDraftFilters)

	useEffect(() => {
		setDraftFilters(initialDraftFilters)
	}, [initialDraftFilters])

	const selectedFilters = useMemo(
		() => createSearchRequestFilters(filterItems, draftFilters),
		[draftFilters, filterItems]
	)
	const initialSelectedFilters = useMemo(
		() => createSearchRequestFilters(filterItems, initialDraftFilters),
		[filterItems, initialDraftFilters]
	)
	const isDirty = useMemo(
		() =>
			!areSearchRequestFiltersEqual(selectedFilters, initialSelectedFilters),
		[selectedFilters, initialSelectedFilters]
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

	return {
		draftFilters,
		isDirty,
		selectedFilters,
		toggleOption
	}
}
