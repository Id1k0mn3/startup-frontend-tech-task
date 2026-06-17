import { create } from 'zustand'

import { SearchRequestFilter } from '../api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	selectedFilters: SearchRequestFilter
	applyFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterStore>(set => ({
	selectedFilters: [],
	applyFilters: filters => set({ selectedFilters: filters })
}))
