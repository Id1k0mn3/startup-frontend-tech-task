import { type FilterItem, FilterType } from '@/shared/api/types/Filter'

import type {
	FilterGroupFixture,
	FilterOptionsLanguage
} from '../model/filter-option.types'

export const filterOptionFixtures = [
	{
		id: 'MEAL_OPTIONS',
		labels: {
			en: 'Meal options',
			uk: 'Харчування'
		},
		options: [
			{
				id: 'breakfast',
				labels: {
					en: 'Breakfast included',
					uk: 'Сніданок включено'
				}
			},
			{
				id: 'lunch',
				labels: {
					en: 'Lunch included',
					uk: 'Обід включено'
				}
			},
			{
				id: 'dinner',
				labels: {
					en: 'Dinner included',
					uk: 'Вечеря включена'
				}
			},
			{
				id: 'all-inclusive',
				labels: {
					en: 'All inclusive',
					uk: 'Усе включено'
				}
			}
		]
	},
	{
		id: 'RULES_POLICIES_PAYMENT',
		labels: {
			en: 'Rules, Policies, and Payment',
			uk: 'Правила, політика та оплата'
		},
		options: [
			{
				id: 'free-cancellation',
				labels: {
					en: 'Free cancellation',
					uk: 'Безкоштовне скасування'
				}
			},
			{
				id: 'pets-allowed',
				labels: {
					en: 'Pets allowed',
					uk: 'Дозволено з тваринами'
				}
			},
			{
				id: 'non-smoking-room',
				labels: {
					en: 'Non-Smoking room',
					uk: 'Номер для некурців'
				}
			}
		]
	},
	{
		id: 'FACILITIES',
		labels: {
			en: 'Facilities',
			uk: 'Зручності'
		},
		options: [
			{
				id: 'private-bathroom',
				labels: {
					en: 'Private bathroom',
					uk: 'Приватна ванна кімната'
				}
			},
			{
				id: 'air-conditioning',
				labels: {
					en: 'Air conditioning',
					uk: 'Кондиціонер'
				}
			},
			{
				id: 'heating',
				labels: {
					en: 'Heating',
					uk: 'Опалення'
				}
			},
			{
				id: 'coffee-tea-maker',
				labels: {
					en: 'Coffee/Tea maker',
					uk: 'Кавоварка / чайник'
				}
			},
			{
				id: 'shuttle-service',
				labels: {
					en: 'Shuttle service',
					uk: 'Трансфер'
				}
			},
			{
				id: 'wi-fi',
				labels: {
					en: 'Wi-Fi',
					uk: 'Wi‑Fi'
				}
			},
			{
				id: 'parking',
				labels: {
					en: 'Parking',
					uk: 'Парковка'
				}
			},
			{
				id: 'pool',
				labels: {
					en: 'Pool',
					uk: 'Басейн'
				}
			}
		]
	},
	{
		id: 'BED_TYPE',
		labels: {
			en: 'Bed type',
			uk: 'Тип ліжка'
		},
		options: [
			{
				id: 'twin-beds',
				labels: {
					en: 'Twin beds',
					uk: 'Два односпальні ліжка'
				}
			},
			{
				id: 'double-bed',
				labels: {
					en: 'Double Bed',
					uk: 'Двоспальне ліжко'
				}
			}
		]
	},
	{
		id: 'HEALTH_ENTERTAINMENT_SPORTS',
		labels: {
			en: 'Health, Entertainment, and Sports',
			uk: "Здоров'я, розваги та спорт"
		},
		options: [
			{
				id: 'gym',
				labels: {
					en: 'Gym',
					uk: 'Тренажерний зал'
				}
			},
			{
				id: 'spa',
				labels: {
					en: 'Spa',
					uk: 'СПА'
				}
			},
			{
				id: 'sauna',
				labels: {
					en: 'Sauna',
					uk: 'Сауна'
				}
			}
		]
	}
] satisfies FilterGroupFixture[]

export const mapFilterFixturesToItems = (
	language: FilterOptionsLanguage
): FilterItem[] =>
	filterOptionFixtures.map(group => ({
		id: group.id,
		name: group.labels[language],
		type: FilterType.OPTION,
		options: group.options.map(option => ({
			id: option.id,
			name: option.labels[language]
		}))
	}))
