import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { SearchRequestFilter } from '../api/types/SearchRequest'

interface FilterStore {
	selectedFilters: SearchRequestFilter
	applyFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterStore>()(
	persist(
		set => ({
			selectedFilters: [],
			applyFilters: filters => set({ selectedFilters: filters })
		}),
		{
			name: 'wwt-confirmed-filters',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				selectedFilters: state.selectedFilters
			})
		}
	)
)
