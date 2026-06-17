import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFiltersQuery } from '@/shared/api/useFiltersQuery'

interface FilterModalProps {
	initialValue: SearchRequestFilter
	onApply: (filters: SearchRequestFilter) => void
	onClose: () => void
}

type DraftFilters = Record<string, string[]>

const createDraftFromSelectedFilters = (
	selectedFilters: SearchRequestFilter
): DraftFilters => {
	return selectedFilters.reduce<DraftFilters>((draft, filter) => {
		draft[filter.id] = filter.optionsIds

		return draft
	}, {})
}

const createSearchRequestFilter = (
	filterItems: FilterItem[],
	draftFilters: DraftFilters
): SearchRequestFilter => {
	return filterItems.reduce<SearchRequestFilter>((filters, filterItem) => {
		const optionsIds = draftFilters[filterItem.id] ?? []

		if (optionsIds.length === 0) {
			return filters
		}

		return [
			...filters,
			{
				id: filterItem.id,
				type: FilterType.OPTION,
				optionsIds
			}
		]
	}, [])
}

export const FilterModal = ({
	initialValue,
	onApply,
	onClose
}: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data, isLoading, isError, refetch } = useFiltersQuery()
	const [draftFilters, setDraftFilters] = useState<DraftFilters>(() =>
		createDraftFromSelectedFilters(initialValue)
	)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		setDraftFilters(createDraftFromSelectedFilters(initialValue))
	}, [initialValue])

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return
			}

			if (isConfirmOpen) {
				setIsConfirmOpen(false)

				return
			}

			onClose()
		}

		window.addEventListener('keydown', handleEscape)

		return () => window.removeEventListener('keydown', handleEscape)
	}, [isConfirmOpen, onClose])

	const filterItems = data?.filterItems ?? []
	const selectedFilters = useMemo(
		() => createSearchRequestFilter(filterItems, draftFilters),
		[draftFilters, filterItems]
	)

	const toggleOption = (filterId: string, optionId: string) => {
		setDraftFilters(currentDraft => {
			const selectedOptions = currentDraft[filterId] ?? []
			const nextSelectedOptions = selectedOptions.includes(optionId)
				? selectedOptions.filter(
						selectedOptionId => selectedOptionId !== optionId
					)
				: [...selectedOptions, optionId]

			return {
				...currentDraft,
				[filterId]: nextSelectedOptions
			}
		})
	}

	const handleConfirm = () => {
		onApply(selectedFilters)
		setIsConfirmOpen(false)
		onClose()
	}

	return (
		<div
			aria-labelledby="filter-modal-title"
			aria-modal="true"
			className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
			role="dialog"
		>
			<section className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
				<header className="flex items-start justify-between gap-6 border-b border-gray-200 px-6 py-5">
					<div>
						<h2
							className="text-2xl font-semibold text-gray-950"
							id="filter-modal-title"
						>
							{t('modal.title')}
						</h2>
						<p className="mt-1 text-sm text-gray-500">{t('modal.subtitle')}</p>
					</div>
					<button
						aria-label={t('modal.close')}
						className="rounded-full px-3 py-1 text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						onClick={onClose}
						type="button"
					>
						{t('modal.closeSymbol')}
					</button>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
					{isLoading && (
						<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
							{t('states.loading')}
						</p>
					)}

					{isError && (
						<div className="rounded-lg border border-red-200 bg-red-50 p-4">
							<p className="text-sm font-medium text-red-900">
								{t('states.error')}
							</p>
							<button
								className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
								onClick={() => void refetch()}
								type="button"
							>
								{t('states.retry')}
							</button>
						</div>
					)}

					{!isLoading && !isError && filterItems.length === 0 && (
						<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
							{t('states.empty')}
						</p>
					)}

					{filterItems.length > 0 && (
						<form className="space-y-6">
							{filterItems.map(filterItem => (
								<fieldset
									className="rounded-xl border border-gray-200 p-4"
									key={filterItem.id}
								>
									<legend className="px-1 text-base font-semibold text-gray-950">
										{filterItem.name}
									</legend>
									{filterItem.description && (
										<p className="mt-1 text-sm text-gray-500">
											{filterItem.description}
										</p>
									)}
									<div className="mt-4 grid gap-3 sm:grid-cols-2">
										{filterItem.options.map(option => {
											const isChecked =
												draftFilters[filterItem.id]?.includes(option.id) ??
												false

											return (
												<label
													className="flex cursor-pointer gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50"
													key={option.id}
												>
													<input
														checked={isChecked}
														className="mt-1 h-4 w-4 accent-blue-700"
														onChange={() =>
															toggleOption(filterItem.id, option.id)
														}
														type="checkbox"
													/>
													<span>
														<span className="block text-sm font-medium text-gray-950">
															{option.name}
														</span>
														{option.description && (
															<span className="mt-1 block text-sm text-gray-500">
																{option.description}
															</span>
														)}
													</span>
												</label>
											)
										})}
									</div>
								</fieldset>
							))}
						</form>
					)}
				</div>

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
						disabled={isLoading || isError || filterItems.length === 0}
						onClick={() => setIsConfirmOpen(true)}
						type="button"
					>
						{t('modal.apply')}
					</button>
				</footer>
			</section>

			{isConfirmOpen && (
				<div
					aria-labelledby="filter-confirm-title"
					aria-modal="true"
					className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4"
					role="alertdialog"
				>
					<section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<h3
							className="text-xl font-semibold text-gray-950"
							id="filter-confirm-title"
						>
							{t('confirm.title')}
						</h3>
						<p className="mt-2 text-sm text-gray-600">{t('confirm.message')}</p>
						<footer className="mt-6 flex justify-end gap-3">
							<button
								className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
								onClick={() => setIsConfirmOpen(false)}
								type="button"
							>
								{t('confirm.cancel')}
							</button>
							<button
								className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
								onClick={handleConfirm}
								type="button"
							>
								{t('confirm.confirm')}
							</button>
						</footer>
					</section>
				</div>
			)}
		</div>
	)
}
