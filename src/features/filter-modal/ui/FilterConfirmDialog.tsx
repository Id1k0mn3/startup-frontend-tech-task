import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'

interface FilterConfirmDialogProps {
	description: string
	title: string
	onCancel: () => void
	onConfirm: () => void
}

export const FilterConfirmDialog = ({
	description,
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
			overlayClassName="z-20 bg-black/50"
			panelClassName="w-full max-w-md p-6"
			role="alertdialog"
			rootRef={dialogRef}
		>
			<h3
				className="text-xl font-semibold text-gray-950"
				id="filter-confirm-title"
			>
				{title}
			</h3>
			<p
				className="mt-3 text-sm text-gray-600"
				id="filter-confirm-description"
			>
				{description}
			</p>
			<footer className="mt-6 flex justify-end gap-3">
				<Button
					onClick={onCancel}
					ref={cancelButtonRef}
					variant="secondary"
				>
					{t('confirm.cancel')}
				</Button>
				<Button onClick={onConfirm}>{t('confirm.confirm')}</Button>
			</footer>
		</Dialog>
	)
}
