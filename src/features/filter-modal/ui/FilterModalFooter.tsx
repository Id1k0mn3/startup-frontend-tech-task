import { type Ref } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

interface FilterModalFooterProps {
	applyDisabled: boolean
	clearDisabled: boolean
	applyButtonRef?: Ref<HTMLButtonElement>
	clearButtonRef?: Ref<HTMLButtonElement>
	onApply: () => void
	onClear: () => void
}

export const FilterModalFooter = ({
	applyDisabled,
	clearDisabled,
	applyButtonRef,
	clearButtonRef,
	onApply,
	onClear
}: FilterModalFooterProps) => {
	const { t } = useTranslation('filter')

	return (
		<footer className="gap-3 px-6 py-4">
			<div className="relative flex justify-center">
				<Button
					disabled={clearDisabled}
					className="absolute top-1/2 right-[0] translate-y-[-50%] border-app-green text-app-green"
					onClick={onClear}
					ref={clearButtonRef}
					variant="text"
					size="default"
				>
					{t('modal.clear')}
				</Button>
				<Button
					disabled={applyDisabled}
					onClick={onApply}
					ref={applyButtonRef}
					size="default"
				>
					{t('modal.apply')}
				</Button>
			</div>
		</footer>
	)
}
