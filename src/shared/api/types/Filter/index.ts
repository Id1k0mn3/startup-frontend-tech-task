export const FilterType = {
	OPTION: 'OPTION'
} as const

export type FilterType = (typeof FilterType)[keyof typeof FilterType]

export interface FilterBase {
	id: string
	name: string
	type: FilterType
}

export interface FilterOption {
	id: string
	name: string
}

export interface OptionFilterItem extends FilterBase {
	type: typeof FilterType.OPTION
	options: FilterOption[]
}

export type FilterChooseOption = FilterOption
export type FilterChoose = OptionFilterItem
export type FilterItem = OptionFilterItem

export interface FilterItemsResponse {
	filterItems: FilterItem[]
}
