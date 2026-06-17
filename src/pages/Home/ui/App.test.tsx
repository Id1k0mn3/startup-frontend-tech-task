import {
	fireEvent,
	render,
	screen,
	waitFor,
	within
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FilterType } from '@/shared/api/types/Filter'
import '@/shared/i18n'
import { useFilterStore } from '@/shared/store/filterStore'

import { App } from './App'

vi.mock('@/shared/api/useFiltersQuery', () => ({
	useFiltersQuery: () => ({
		data: {
			filterItems: [
				{
					id: 'meal',
					name: 'Meal options',
					description: 'Choose the type of dining',
					type: FilterType.OPTION,
					options: [
						{
							id: 'breakfast',
							name: 'Breakfast included'
						},
						{
							id: 'dinner',
							name: 'Dinner included'
						}
					]
				},
				{
					id: 'facilities',
					name: 'Facilities',
					description: 'Room and hotel facilities',
					type: FilterType.OPTION,
					options: [
						{
							id: 'wifi',
							name: 'Wi-Fi'
						},
						{
							id: 'parking',
							name: 'Parking'
						}
					]
				}
			]
		},
		isLoading: false,
		isError: false,
		refetch: vi.fn()
	})
}))

const renderApp = () => render(<App />)

const getSelectedFiltersPre = () => {
	const pre = document.querySelector('pre')

	if (!pre) {
		throw new Error('Selected filters pre element not found')
	}

	return pre
}

beforeEach(() => {
	localStorage.clear()
	useFilterStore.setState({ selectedFilters: [] })
})

describe('App filter modal flow', () => {
	it('renders the Open Filters button', () => {
		renderApp()

		expect(
			screen.getByRole('button', { name: 'Open filters' })
		).toBeInTheDocument()
	})

	it('opens the modal and renders loaded filter options', () => {
		renderApp()

		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))

		expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument()
		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('checkbox', { name: 'Parking' })
		).toBeInTheDocument()
	})

	it('opens the modal pre-filled from previously confirmed filters', () => {
		useFilterStore.setState({
			selectedFilters: [
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			]
		})

		renderApp()

		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))

		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).toBeChecked()
		expect(
			screen.getByRole('checkbox', { name: 'Dinner included' })
		).not.toBeChecked()
	})

	it('keeps draft changes local until confirmation', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))

		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)

		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).toBeChecked()
	})

	it('does not update confirmed state when modal is canceled', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)

		fireEvent.click(
			within(screen.getByRole('dialog', { name: 'Filters' })).getByRole(
				'button',
				{ name: 'Cancel' }
			)
		)

		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('opens confirmation before saving draft filters', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		expect(
			screen.getByRole('alertdialog', { name: 'Apply selected filters?' })
		).toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('does not update confirmed state when confirmation is canceled', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		fireEvent.click(
			within(
				screen.getByRole('alertdialog', { name: 'Apply selected filters?' })
			).getByRole('button', { name: 'Cancel' })
		)

		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('saves draft filters to global state when confirmation is accepted', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('breakfast')
	})

	it('pressing Escape closes the confirmation dialog first and then the modal', () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		fireEvent.keyDown(window, { key: 'Escape' })
		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument()

		fireEvent.keyDown(window, { key: 'Escape' })
		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
	})

	it('updates homepage JSON only after confirmation', async () => {
		renderApp()
		fireEvent.click(screen.getByRole('button', { name: 'Open filters' }))
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
		fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))

		await waitFor(() => {
			expect(getSelectedFiltersPre()).toHaveTextContent('breakfast')
		})
	})
})
