import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/features/change-language'
import { FilterModal } from '@/features/filter-modal'
import { I18N_DEFAULT_LANGUAGE, isAppLanguage } from '@/shared/i18n'
import { useFilterStore } from '@/shared/store/filterStore'
import { Button } from '@/shared/ui/Button'

export const App = () => {
	const { t, i18n } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const openFiltersButtonRef = useRef<HTMLButtonElement>(null)
	const shouldRestoreFocusRef = useRef(false)
	const selectedFilters = useFilterStore(state => state.selectedFilters)
	const applyFilters = useFilterStore(state => state.applyFilters)
	const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language
	const currentLanguage = isAppLanguage(resolvedLanguage)
		? resolvedLanguage
		: I18N_DEFAULT_LANGUAGE

	const closeFilterModal = () => {
		shouldRestoreFocusRef.current = true
		setIsFilterModalOpen(false)
	}

	useEffect(() => {
		if (!isFilterModalOpen && shouldRestoreFocusRef.current) {
			shouldRestoreFocusRef.current = false
			openFiltersButtonRef.current?.focus()
		}
	}, [isFilterModalOpen])

	return (
		<main className="min-h-dvh bg-slate-50 px-4 py-10">
			<section
				aria-hidden={isFilterModalOpen ? true : undefined}
				className="mx-auto flex w-full max-w-4xl flex-col gap-6"
			>
				<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-semibold text-gray-950">
							{t('home.title')}
						</h1>
						<p className="mt-2 text-sm text-gray-600">
							{t('home.description')}
						</p>
					</div>
					<div className="flex flex-col gap-3 sm:items-end">
						<LanguageSwitcher />
						<Button
							onClick={() => setIsFilterModalOpen(true)}
							ref={openFiltersButtonRef}
							size="large"
						>
							{t('home.openFilters')}
						</Button>
					</div>
				</header>

				<section aria-labelledby="selected-filters-title">
					<h2
						className="mb-3 text-lg font-semibold text-gray-950"
						id="selected-filters-title"
					>
						{t('home.selectedFilters')}
					</h2>
					<pre className="overflow-auto rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 shadow-sm">
						{JSON.stringify(selectedFilters, null, 2)}
					</pre>
				</section>
			</section>

			{isFilterModalOpen && (
				<FilterModal
					initialValue={selectedFilters}
					language={currentLanguage}
					onApply={applyFilters}
					onClose={closeFilterModal}
				/>
			)}
		</main>
	)
}
