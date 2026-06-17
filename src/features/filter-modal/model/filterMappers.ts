import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { DraftFilters } from './types'

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
	filterItems?: FilterItem[]
): DraftFilters => {
	if (!Array.isArray(selectedFilters)) {
		return {}
	}

	const optionIdsByFilterId = filterItems
		? createOptionIdsByFilterId(filterItems)
		: undefined

	return selectedFilters.reduce<DraftFilters>((draft, filter) => {
		if (!isRecord(filter) || typeof filter.id !== 'string') {
			return draft
		}

		const validOptionIds = optionIdsByFilterId?.get(filter.id)

		if (optionIdsByFilterId && !validOptionIds) {
			return draft
		}

		const optionsIds = collectValidOptionIds(filter.optionsIds, validOptionIds)

		if (optionsIds.length === 0) {
			return draft
		}

		draft[filter.id] = optionsIds

		return draft
	}, {})
}

export const createSearchRequestFilters = (
	filterItems: FilterItem[],
	draftFilters: DraftFilters
): SearchRequestFilter => {
	const draftFilterValues: unknown = draftFilters

	if (!isRecord(draftFilterValues)) {
		return []
	}

	return filterItems.reduce<SearchRequestFilter>((filters, filterItem) => {
		const validOptionIds = new Set(filterItem.options.map(option => option.id))
		const optionsIds = collectValidOptionIds(
			draftFilterValues[filterItem.id],
			validOptionIds
		)

		if (optionsIds.length === 0) {
			return filters
		}

		return [
			...filters,
			{
				id: filterItem.id,
				type: FilterType.OPTION,
				optionsIds: [...optionsIds]
			}
		]
	}, [])
}
