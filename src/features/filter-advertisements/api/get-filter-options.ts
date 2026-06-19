import type { FilterItemsResponse } from '@/shared/api/types/Filter'
import type { AppLanguage } from '@/shared/i18n'

import { mapFilterFixturesToItems } from './filter-options.fixture'

export const getFilterOptions = async (
	language: AppLanguage
): Promise<FilterItemsResponse> => {
	return { filterItems: mapFilterFixturesToItems(language) }
}
