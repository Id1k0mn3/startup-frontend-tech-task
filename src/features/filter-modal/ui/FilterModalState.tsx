import { useTranslation } from 'react-i18next'

import { FilterModalStateProps } from '../model/types'

export const FilterModalState = (props: FilterModalStateProps) => {
	const { t } = useTranslation('filter')

	switch (props.state) {
		case 'loading':
			return (
				<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
					{t('states.loading')}
				</p>
			)

		case 'error':
			return (
				<div className="rounded-lg border border-red-200 bg-red-50 p-4">
					<p className="text-sm font-medium text-red-900">
						{t('states.error')}
					</p>
					<button
						className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-800"
						onClick={props.onRetry}
						type="button"
					>
						{t('states.retry')}
					</button>
				</div>
			)

		case 'empty':
			return (
				<p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
					{t('states.empty')}
				</p>
			)
	}

	return null
}
