import { useQuery } from '@tanstack/react-query'

import type { FilterItemsResponse } from '@/shared/api/types/Filter'
import type { AppLanguage } from '@/shared/i18n'

import { getFilterOptions } from './get-filter-options'

export const filterOptionsQueryKey = (language: AppLanguage) =>
	['filter-options', language] as const

export const useFilterOptionsQuery = (language: AppLanguage) => {
	return useQuery<FilterItemsResponse>({
		queryKey: filterOptionsQueryKey(language),
		queryFn: () => getFilterOptions(language)
	})
}
