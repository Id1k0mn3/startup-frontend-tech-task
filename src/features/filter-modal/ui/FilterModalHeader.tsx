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
		<header className="relative pb-6 mb-8">
			<div className="relative">
				<h2
					className="text-2xl text-center font-semibold text-gray-950 font-medium"
					id="filter-modal-title"
				>
					{t('modal.title')}
				</h2>
				<button
					aria-label={t('modal.close')}
					className="absolute right-[0] rounded-full px-3 py-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 top-1/2 translate-y-[-50%]"
					onClick={onClose}
					ref={closeButtonRef}
					type="button"
				>
					{closeButtonSymbol}
				</button>
			</div>
			<div className="absolute bottom-[0] size-[2px] w-full bg-app-light-gray rounded-xs"></div>
		</header>
	)
}
