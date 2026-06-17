import filterData from '../temp/filterData.json'
import { FilterItem, FilterItemsResponse, FilterType } from './types/Filter'

const filterItems: FilterItem[] = filterData.filterItems.map(filterItem => ({
	...filterItem,
	type: FilterType.OPTION
}))

export const getFilterItems = async (): Promise<FilterItemsResponse> => {
	return { filterItems }
}
