import { FilterItem } from '@/shared/api/types/Filter'
import { FilterOptionFieldset } from '@/shared/ui/filter-option'

import { DraftFilterSelections, FilterModalFiltersProps } from '../model/types'
import { FilterModalState } from './FilterModalState'

const renderFilterGroup = (
	filterItem: FilterItem,
	draftFilters: DraftFilterSelections,
	onToggle: (filterId: string, optionId: string) => void
) => {
	const selectedOptionIds = draftFilters[filterItem.id] ?? []

	return (
		<FilterOptionFieldset
			description={filterItem.description}
			key={filterItem.id}
			label={filterItem.name}
			onToggle={optionId => onToggle(filterItem.id, optionId)}
			options={filterItem.options}
			selectedOptionIds={selectedOptionIds}
		/>
	)
}

export const FilterModalFilters = (props: FilterModalFiltersProps) => {
	switch (props.state) {
		case 'loading':
		case 'error':
		case 'empty':
			return <FilterModalState {...props} />

		case 'ready':
			return (
				<form className="space-y-6">
					{props.filterItems.map(filterItem =>
						renderFilterGroup(filterItem, props.draftFilters, props.onToggle)
					)}
				</form>
			)
	}

	return null
}
