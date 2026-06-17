import { FilterChoose } from '@/shared/api/types/Filter'

export type DraftFilters = Record<string, string[]>

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
			draftFilters: DraftFilters
			filterItems: FilterChoose[]
			onToggle: (filterId: string, optionId: string) => void
			state: 'ready'
	  }
