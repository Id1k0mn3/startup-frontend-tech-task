interface FilterOptionCheckboxProps {
	checked: boolean
	description?: string
	label: string
	onChange: () => void
}

export const FilterOptionCheckbox = ({
	checked,
	description,
	label,
	onChange
}: FilterOptionCheckboxProps) => {
	return (
		<label className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50">
			<input
				checked={checked}
				className="mt-1 h-4 w-4 accent-blue-700"
				onChange={onChange}
				type="checkbox"
			/>
			<span>
				<span className="block text-sm font-medium text-gray-950">{label}</span>
				{description && (
					<span className="mt-1 block text-sm text-gray-500">
						{description}
					</span>
				)}
			</span>
		</label>
	)
}
