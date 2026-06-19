import type { AppLanguage } from '@/shared/i18n'

export interface LocalizedText {
	en: string
	uk: string
}

export interface FilterOptionFixture {
	id: string
	labels: LocalizedText
}

export interface FilterGroupFixture {
	id: string
	labels: LocalizedText
	options: FilterOptionFixture[]
}

export type FilterOptionsLanguage = AppLanguage
