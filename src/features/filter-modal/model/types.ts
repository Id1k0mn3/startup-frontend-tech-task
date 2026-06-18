import { FilterItem } from '@/shared/api/types/Filter'

export type DraftFilterSelections = Record<string, string[]>
export type DraftFilters = DraftFilterSelections

export type FilterModalStateProps =
	| {
			state: 'loading'
	  }
	| {
			onRetry: () => void
			state: 'error'
	  }
	| {
			state: 'empty'
	  }

export type FilterModalFiltersProps =
	| FilterModalStateProps
	| {
			draftFilters: DraftFilterSelections
			filterItems: FilterItem[]
			onToggle: (filterId: string, optionId: string) => void
			state: 'ready'
	  }
