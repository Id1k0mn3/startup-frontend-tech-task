import { FilterType } from '../Filter/FilterType'

export interface SearchRequestFilterBase {
	id: string
	type: FilterType
}

export interface SearchRequestOptions extends SearchRequestFilterBase {
	type: typeof FilterType.OPTION
	optionsIds: string[]
}

export type SearchRequestFilter = SearchRequestOptions[]
