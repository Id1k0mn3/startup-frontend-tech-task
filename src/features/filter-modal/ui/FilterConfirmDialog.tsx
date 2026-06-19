import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

interface FilterConfirmDialogProps {
	title: string
	onCancel: () => void
	onConfirm: () => void
}

export const FilterConfirmDialog = ({
	title,
	onCancel,
	onConfirm
}: FilterConfirmDialogProps) => {
	const { t } = useTranslation('filter')
	const dialogRef = useRef<HTMLDivElement>(null)
	const cancelButtonRef = useRef<HTMLButtonElement>(null)

	useFocusTrap(dialogRef, true)

	useEffect(() => {
		cancelButtonRef.current?.focus()
	}, [])

	return (
		<Dialog
			ariaLabelledBy="filter-confirm-title"
			overlayClassName="z-20 bg-black/50 pt-[200px]"
			panelClassName="w-full max-w-[1280px] justify-start p-6"
			role="alertdialog"
			rootRef={dialogRef}
		>
			<h3
				className="text-xl font-medium text-[40px] text-center text-gray-950 mb-[120px]"
				id="filter-confirm-title"
			>
				{title}
			</h3>
			<footer className="mt-6 flex justify-center gap-3">
				<Button
					onClick={onCancel}
					className="w-[280px]"
					ref={cancelButtonRef}
					variant="secondary"
				>
					{t('confirm.cancel')}
				</Button>
				<Button
					className="w-[280px]"
					onClick={onConfirm}
				>
					{t('confirm.confirm')}
				</Button>
			</footer>
		</Dialog>
	)
}
