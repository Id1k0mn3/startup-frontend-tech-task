import { useTranslation } from 'react-i18next'

interface FilterModalFooterProps {
	applyDisabled: boolean
	onApply: () => void
	onClose: () => void
}

export const FilterModalFooter = ({
	applyDisabled,
	onApply,
	onClose
}: FilterModalFooterProps) => {
	const { t } = useTranslation('filter')

	return (
		<footer className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
			<button
				className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
				onClick={onClose}
				type="button"
			>
				{t('modal.cancel')}
			</button>
			<button
				className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
				disabled={applyDisabled}
				onClick={onApply}
				type="button"
			>
				{t('modal.apply')}
			</button>
		</footer>
	)
}
