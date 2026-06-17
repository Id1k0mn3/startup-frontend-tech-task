import { type Ref } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

interface FilterModalFooterProps {
	applyDisabled: boolean
	applyButtonRef?: Ref<HTMLButtonElement>
	onApply: () => void
	onClose: () => void
}

export const FilterModalFooter = ({
	applyDisabled,
	applyButtonRef,
	onApply,
	onClose
}: FilterModalFooterProps) => {
	const { t } = useTranslation('filter')

	return (
		<footer className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
			<Button
				onClick={onClose}
				size="default"
				variant="secondary"
			>
				{t('modal.cancel')}
			</Button>
			<Button
				disabled={applyDisabled}
				onClick={onApply}
				ref={applyButtonRef}
				size="default"
			>
				{t('modal.apply')}
			</Button>
		</footer>
	)
}
