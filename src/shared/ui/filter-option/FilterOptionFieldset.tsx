import { FilterOption } from '@/shared/api/types/Filter'

import { FilterOptionCheckbox } from './FilterOptionCheckbox'

interface FilterOptionFieldsetProps {
	description?: string
	label: string
	onToggle: (optionId: string) => void
	options: FilterOption[]
	selectedOptionIds: string[]
}

export const FilterOptionFieldset = ({
	description,
	label,
	onToggle,
	options,
	selectedOptionIds
}: FilterOptionFieldsetProps) => {
	return (
		<fieldset className="rounded-xl border border-gray-200 p-4">
			<legend className="px-1 text-base font-semibold text-gray-950">
				{label}
			</legend>
			{description && (
				<p className="mt-1 text-sm text-gray-500">{description}</p>
			)}
			<div className="mt-4 grid gap-3 sm:grid-cols-2">
				{options.map(option => (
					<FilterOptionCheckbox
						checked={selectedOptionIds.includes(option.id)}
						description={option.description}
						key={option.id}
						label={option.name}
						onChange={() => onToggle(option.id)}
					/>
				))}
			</div>
		</fieldset>
	)
}
