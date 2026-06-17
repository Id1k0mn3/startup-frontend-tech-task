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

const openFilterModal = () => {
	const openFiltersButton = screen.getByRole('button', {
		name: 'Open filters'
	})

	fireEvent.click(openFiltersButton)

	return openFiltersButton
}

const getFilterDialog = () => screen.getByRole('dialog', { name: 'Filters' })

const getConfirmDialog = () =>
	screen.getByRole('alertdialog', { name: 'Apply selected filters?' })

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

		openFilterModal()

		expect(getFilterDialog()).toBeInTheDocument()
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

		openFilterModal()

		expect(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		).toBeChecked()
		expect(
			screen.getByRole('checkbox', { name: 'Dinner included' })
		).not.toBeChecked()
	})

	it('keeps draft changes local until confirmation', () => {
		renderApp()
		openFilterModal()

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
		openFilterModal()
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)

		fireEvent.click(
			within(getFilterDialog()).getByRole('button', { name: 'Cancel' })
		)

		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('opens confirmation before saving draft filters', () => {
		renderApp()
		openFilterModal()
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		expect(getConfirmDialog()).toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('does not update confirmed state when confirmation is canceled', () => {
		renderApp()
		openFilterModal()
		fireEvent.click(
			screen.getByRole('checkbox', { name: 'Breakfast included' })
		)
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		fireEvent.click(
			within(getConfirmDialog()).getByRole('button', { name: 'Cancel' })
		)

		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		expect(getFilterDialog()).toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('saves draft filters to global state when confirmation is accepted', () => {
		renderApp()
		openFilterModal()
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

	it('moves focus to the close button when the modal opens', async () => {
		renderApp()

		openFilterModal()

		expect(getFilterDialog()).toHaveAccessibleDescription(
			'Select the options that should be included in the search request.'
		)

		await waitFor(() => {
			expect(
				screen.getByRole('button', { name: 'Close filters' })
			).toHaveFocus()
		})
	})

	it('moves focus to confirmation Cancel when Apply is clicked', async () => {
		renderApp()
		openFilterModal()

		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		const confirmDialog = getConfirmDialog()
		const cancelButton = within(confirmDialog).getByRole('button', {
			name: 'Cancel'
		})

		expect(confirmDialog).toHaveAccessibleDescription(
			'Your current draft will replace the previously confirmed filters.'
		)

		await waitFor(() => {
			expect(cancelButton).toHaveFocus()
		})
	})

	it('keeps focus inside the modal when confirmation is canceled', async () => {
		renderApp()
		openFilterModal()
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		fireEvent.click(
			within(getConfirmDialog()).getByRole('button', { name: 'Cancel' })
		)

		expect(getFilterDialog()).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getByRole('button', { name: 'Apply' })).toHaveFocus()
		})
	})

	it('pressing Escape closes the confirmation dialog first and then the modal', () => {
		renderApp()
		openFilterModal()
		fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

		fireEvent.keyDown(window, { key: 'Escape' })
		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
		expect(getFilterDialog()).toBeInTheDocument()

		fireEvent.keyDown(window, { key: 'Escape' })
		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
	})

	it('pressing Escape closes the modal when confirmation is not open', () => {
		renderApp()
		openFilterModal()

		fireEvent.keyDown(window, { key: 'Escape' })

		expect(
			screen.queryByRole('dialog', { name: 'Filters' })
		).not.toBeInTheDocument()
		expect(getSelectedFiltersPre()).toHaveTextContent('[]')
	})

	it('returns focus to Open filters after the modal closes', async () => {
		renderApp()
		const openFiltersButton = openFilterModal()

		fireEvent.keyDown(window, { key: 'Escape' })

		await waitFor(() => {
			expect(openFiltersButton).toHaveFocus()
		})
	})

	it('keeps Tab focus inside the active dialog', () => {
		renderApp()
		openFilterModal()

		const closeButton = screen.getByRole('button', { name: 'Close filters' })
		const applyButton = screen.getByRole('button', { name: 'Apply' })

		applyButton.focus()
		fireEvent.keyDown(document, { key: 'Tab' })

		expect(closeButton).toHaveFocus()

		fireEvent.click(applyButton)

		const confirmDialog = getConfirmDialog()
		const confirmCancelButton = within(confirmDialog).getByRole('button', {
			name: 'Cancel'
		})
		const confirmButton = within(confirmDialog).getByRole('button', {
			name: 'Confirm'
		})

		confirmButton.focus()
		fireEvent.keyDown(document, { key: 'Tab' })

		expect(confirmCancelButton).toHaveFocus()

		fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })

		expect(confirmButton).toHaveFocus()
	})

	it('updates homepage JSON only after confirmation', async () => {
		renderApp()
		openFilterModal()
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
