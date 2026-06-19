import { FilterOption } from '@/shared/api/types/Filter'

import { FilterOptionCheckbox } from './FilterOptionCheckbox'

interface FilterOptionFieldsetProps {
	label: string
	onToggle: (optionId: string) => void
	options: FilterOption[]
	selectedOptionIds: string[]
}

export const FilterOptionFieldset = ({
	label,
	onToggle,
	options,
	selectedOptionIds
}: FilterOptionFieldsetProps) => {
	return (
		<fieldset className="mb-8">
			<legend className="font-medium border-bottom text-app-base text-2xl">
				{label}
			</legend>
			<div className="mt-6 grid sm:grid-cols-3 gap-4 ">
				{options.map(option => (
					<FilterOptionCheckbox
						checked={selectedOptionIds.includes(option.id)}
						key={option.id}
						label={option.name}
						onChange={() => onToggle(option.id)}
					/>
				))}
			</div>
			<div className="size-[2px] w-full bg-app-light-gray rounded-xs mt-8"></div>
		</fieldset>
	)
}
