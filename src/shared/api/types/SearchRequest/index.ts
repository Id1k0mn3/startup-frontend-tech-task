import { FilterType } from '../Filter'

export interface SearchRequestFilterBase {
	id: string
	type: FilterType
}

export interface SearchRequestOptionFilter extends SearchRequestFilterBase {
	type: typeof FilterType.OPTION
	optionsIds: string[]
}

export type SearchRequestOptions = SearchRequestOptionFilter
export type SearchRequestFilters = SearchRequestOptionFilter[]
export type SearchRequestFilter = SearchRequestFilters
