import { describe, expect, it } from 'vitest'

import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import {
	createDraftFromSelectedFilters,
	createSearchRequestFilters
} from './filterMappers'
import { DraftFilters } from './types'

const createTestFilterItems = (): FilterItem[] => [
	{
		id: 'meal',
		name: 'Meal',
		type: FilterType.OPTION,
		options: [
			{
				id: 'breakfast',
				name: 'Breakfast'
			},
			{
				id: 'dinner',
				name: 'Dinner'
			}
		]
	},
	{
		id: 'facilities',
		name: 'Facilities',
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

describe('filterMappers', () => {
	describe('createDraftFromSelectedFilters', () => {
		it('creates empty draft from empty selected filters', () => {
			expect(
				createDraftFromSelectedFilters([], createTestFilterItems())
			).toEqual({})
		})

		it('converts selected filters to draft filters', () => {
			const selectedFilters: SearchRequestFilter = [
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast', 'dinner']
				}
			]

			expect(
				createDraftFromSelectedFilters(selectedFilters, createTestFilterItems())
			).toEqual({
				meal: ['breakfast', 'dinner']
			})
		})

		it('ignores unknown selected filter ids', () => {
			const selectedFilters: SearchRequestFilter = [
				{
					id: 'unknown',
					type: FilterType.OPTION,
					optionsIds: ['anything']
				},
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			]

			expect(
				createDraftFromSelectedFilters(selectedFilters, createTestFilterItems())
			).toEqual({
				meal: ['breakfast']
			})
		})

		it('ignores unknown selected option ids', () => {
			const selectedFilters: SearchRequestFilter = [
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast', 'unknown', 'dinner']
				}
			]

			expect(
				createDraftFromSelectedFilters(selectedFilters, createTestFilterItems())
			).toEqual({
				meal: ['breakfast', 'dinner']
			})
		})

		it('does not throw when persisted selected filters are corrupted', () => {
			const corruptedSelectedFilters = [
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast', 42, 'unknown', 'breakfast']
				},
				{
					id: 'facilities',
					type: FilterType.OPTION,
					optionsIds: 'wifi'
				},
				{
					id: 123,
					type: FilterType.OPTION,
					optionsIds: ['parking']
				},
				null
			] as unknown as SearchRequestFilter

			expect(() =>
				createDraftFromSelectedFilters(
					corruptedSelectedFilters,
					createTestFilterItems()
				)
			).not.toThrow()
			expect(
				createDraftFromSelectedFilters(
					corruptedSelectedFilters,
					createTestFilterItems()
				)
			).toEqual({
				meal: ['breakfast']
			})
			expect(
				createDraftFromSelectedFilters(
					{ id: 'meal' } as unknown as SearchRequestFilter,
					createTestFilterItems()
				)
			).toEqual({})
		})
	})

	describe('createSearchRequestFilters', () => {
		it('converts draft filters to search request filters', () => {
			const draftFilters: DraftFilters = {
				meal: ['breakfast'],
				facilities: ['wifi', 'parking']
			}

			expect(
				createSearchRequestFilters(createTestFilterItems(), draftFilters)
			).toEqual([
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				},
				{
					id: 'facilities',
					type: FilterType.OPTION,
					optionsIds: ['wifi', 'parking']
				}
			])
		})

		it('ignores unknown draft filter ids', () => {
			const draftFilters: DraftFilters = {
				unknown: ['anything'],
				meal: ['breakfast']
			}

			expect(
				createSearchRequestFilters(createTestFilterItems(), draftFilters)
			).toEqual([
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			])
		})

		it('ignores unknown draft option ids', () => {
			const draftFilters: DraftFilters = {
				meal: ['breakfast', 'unknown', 'dinner']
			}

			expect(
				createSearchRequestFilters(createTestFilterItems(), draftFilters)
			).toEqual([
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast', 'dinner']
				}
			])
		})

		it('does not include empty option selections in search request filters', () => {
			const draftFilters: DraftFilters = {
				meal: [],
				facilities: ['unknown']
			}

			expect(
				createSearchRequestFilters(createTestFilterItems(), draftFilters)
			).toEqual([])
		})

		it('does not throw when draft filters are corrupted', () => {
			const corruptedDraftFilters = {
				meal: ['breakfast', 42, 'unknown', 'breakfast'],
				facilities: 'wifi'
			} as unknown as DraftFilters

			expect(() =>
				createSearchRequestFilters(
					createTestFilterItems(),
					corruptedDraftFilters
				)
			).not.toThrow()
			expect(
				createSearchRequestFilters(
					createTestFilterItems(),
					corruptedDraftFilters
				)
			).toEqual([
				{
					id: 'meal',
					type: FilterType.OPTION,
					optionsIds: ['breakfast']
				}
			])
			expect(
				createSearchRequestFilters(
					createTestFilterItems(),
					null as unknown as DraftFilters
				)
			).toEqual([])
		})
	})
})
