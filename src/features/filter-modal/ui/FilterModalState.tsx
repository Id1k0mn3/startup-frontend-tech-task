import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

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
					<Button
						className="mt-3"
						onClick={props.onRetry}
						variant="danger"
					>
						{t('states.retry')}
					</Button>
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
