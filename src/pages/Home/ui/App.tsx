import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterModal } from '@/features/filter-modal'
import { useFilterStore } from '@/shared/store/filterStore'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const selectedFilters = useFilterStore(state => state.selectedFilters)
	const applyFilters = useFilterStore(state => state.applyFilters)

	return (
		<main className="min-h-dvh bg-slate-50 px-4 py-10">
			<section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-semibold text-gray-950">
							{t('home.title')}
						</h1>
						<p className="mt-2 text-sm text-gray-600">
							{t('home.description')}
						</p>
					</div>
					<button
						className="w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
						onClick={() => setIsFilterModalOpen(true)}
						type="button"
					>
						{t('home.openFilters')}
					</button>
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
					onApply={applyFilters}
					onClose={() => setIsFilterModalOpen(false)}
				/>
			)}
		</main>
	)
}
