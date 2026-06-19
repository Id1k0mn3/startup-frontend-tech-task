interface FilterOptionCheckboxProps {
	checked: boolean
	label: string
	onChange: () => void
}

export const FilterOptionCheckbox = ({
	checked,
	label,
	onChange
}: FilterOptionCheckboxProps) => {
	return (
		<label className="flex items-center cursor-pointer gap-3 transition hover:border-blue-300 hover:bg-blue-50/50">
			<input
				checked={checked}
				className="h-4 w-4 accent-blue-700"
				onChange={onChange}
				type="checkbox"
			/>
			<span className="block text-base text-app-base">{label}</span>
		</label>
	)
}
