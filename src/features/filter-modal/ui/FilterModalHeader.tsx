import { type Ref } from 'react'
import { useTranslation } from 'react-i18next'

interface FilterModalHeaderProps {
	closeButtonRef?: Ref<HTMLButtonElement>
	onClose: () => void
}

const closeButtonSymbol = String.fromCharCode(215)

export const FilterModalHeader = ({
	closeButtonRef,
	onClose
}: FilterModalHeaderProps) => {
	const { t } = useTranslation('filter')

	return (
		<header className="flex items-start justify-between gap-6 border-b border-gray-200 px-6 py-5">
			<div>
				<h2
					className="text-2xl font-semibold text-gray-950"
					id="filter-modal-title"
				>
					{t('modal.title')}
				</h2>
				<p
					className="mt-1 text-sm text-gray-500"
					id="filter-modal-description"
				>
					{t('modal.subtitle')}
				</p>
			</div>
			<button
				aria-label={t('modal.close')}
				className="rounded-full px-3 py-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
				onClick={onClose}
				ref={closeButtonRef}
				type="button"
			>
				{closeButtonSymbol}
			</button>
		</header>
	)
}
