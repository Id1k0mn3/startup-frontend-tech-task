import filterData from '../temp/filterData.json'
import { FilterItemsResponse } from './types/Filter'

export const getFilterItems = async (): Promise<FilterItemsResponse> => {
	return filterData as FilterItemsResponse
}
