import { useQuery } from '@tanstack/react-query'

import { getFilterItems } from './filterApi'

export const filtersQueryKey = ['filters'] as const

export const useFiltersQuery = () => {
	return useQuery({
		queryKey: filtersQueryKey,
		queryFn: getFilterItems
	})
}
