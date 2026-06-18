import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import {
	SearchRequestFilter,
	SearchRequestFilters
} from '@/shared/api/types/SearchRequest'

import { DraftFilterSelections } from './types'

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null
}

const createOptionIdsByFilterId = (
	filterItems: FilterItem[]
): Map<string, Set<string>> => {
	return new Map(
		filterItems.map(filterItem => [
			filterItem.id,
			new Set(filterItem.options.map(option => option.id))
		])
	)
}

const collectValidOptionIds = (
	optionIds: unknown,
	validOptionIds?: Set<string>
): string[] => {
	if (!Array.isArray(optionIds)) {
		return []
	}

	const uniqueOptionIds = new Set<string>()

	return optionIds.filter((optionId): optionId is string => {
		if (
			typeof optionId !== 'string' ||
			uniqueOptionIds.has(optionId) ||
			(validOptionIds && !validOptionIds.has(optionId))
		) {
			return false
		}

		uniqueOptionIds.add(optionId)

		return true
	})
}

export const createDraftFromSelectedFilters = (
	selectedFilters: SearchRequestFilter,
	filterItems: FilterItem[]
): DraftFilterSelections => {
	if (!Array.isArray(selectedFilters)) {
		return {}
	}

	const optionIdsByFilterId = createOptionIdsByFilterId(filterItems)

	return selectedFilters.reduce<DraftFilterSelections>((draft, filter) => {
		if (!isRecord(filter) || typeof filter.id !== 'string') {
			return draft
		}

		const validOptionIds = optionIdsByFilterId.get(filter.id)

		if (!validOptionIds) {
			return draft
		}

		const selectedOptionIds = collectValidOptionIds(
			filter.optionsIds,
			validOptionIds
		)

		if (selectedOptionIds.length === 0) {
			return draft
		}

		draft[filter.id] = selectedOptionIds

		return draft
	}, {})
}

export const createSearchRequestFilters = (
	filterItems: FilterItem[],
	draftFilters: DraftFilterSelections
): SearchRequestFilters => {
	const draftFilterValues: unknown = draftFilters

	if (!isRecord(draftFilterValues)) {
		return []
	}

	return filterItems.reduce<SearchRequestFilters>((filters, filterItem) => {
		const validOptionIds = new Set(filterItem.options.map(option => option.id))
		const selectedOptionIds = collectValidOptionIds(
			draftFilterValues[filterItem.id],
			validOptionIds
		)

		if (selectedOptionIds.length === 0) {
			return filters
		}

		return [
			...filters,
			{
				id: filterItem.id,
				type: FilterType.OPTION,
				optionsIds: [...selectedOptionIds]
			}
		]
	}, [])
}
