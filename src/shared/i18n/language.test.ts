import { beforeEach, describe, expect, it } from 'vitest'

import { I18N_DEFAULT_LANGUAGE, I18N_STORAGE_KEY } from './i18nConstants'
import { getStoredLanguage, persistLanguage } from './language'

describe('language storage', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it('defaults to English when no language is stored', () => {
		expect(getStoredLanguage()).toBe(I18N_DEFAULT_LANGUAGE)
	})

	it('reads a stored supported language', () => {
		localStorage.setItem(I18N_STORAGE_KEY, 'uk')

		expect(getStoredLanguage()).toBe('uk')
	})

	it('falls back to English for unsupported values', () => {
		localStorage.setItem(I18N_STORAGE_KEY, 'de')

		expect(getStoredLanguage()).toBe(I18N_DEFAULT_LANGUAGE)
	})

	it('persists a supported language', () => {
		persistLanguage('uk')

		expect(localStorage.getItem(I18N_STORAGE_KEY)).toBe('uk')
	})
})
