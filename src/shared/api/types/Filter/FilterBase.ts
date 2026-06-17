import { FilterType } from './FilterType'

export interface FilterBase {
	id: string
	name: string
	description?: string
	type: FilterType
}
