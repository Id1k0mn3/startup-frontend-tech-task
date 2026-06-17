import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useFocusTrap } from '@/shared/hooks/useFocusTrap'

interface FilterConfirmDialogProps {
	onCancel: () => void
	onConfirm: () => void
}

export const FilterConfirmDialog = ({
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
		<div
			aria-describedby="filter-confirm-description"
			aria-labelledby="filter-confirm-title"
			aria-modal="true"
			className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4"
			ref={dialogRef}
			role="alertdialog"
		>
			<section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
				<h3
					className="text-xl font-semibold text-gray-950"
					id="filter-confirm-title"
				>
					{t('confirm.title')}
				</h3>
				<p
					className="mt-2 text-sm text-gray-600"
					id="filter-confirm-description"
				>
					{t('confirm.message')}
				</p>
				<footer className="mt-6 flex justify-end gap-3">
					<button
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
						onClick={onCancel}
						ref={cancelButtonRef}
						type="button"
					>
						{t('confirm.cancel')}
					</button>
					<button
						className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
						onClick={onConfirm}
						type="button"
					>
						{t('confirm.confirm')}
					</button>
				</footer>
			</section>
		</div>
	)
}
