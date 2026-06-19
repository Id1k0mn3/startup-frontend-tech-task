import {
	I18N_DEFAULT_LANGUAGE,
	I18N_STORAGE_KEY,
	I18N_SUPPORTED_LANGUAGES
} from './i18nConstants'

export type AppLanguage = (typeof I18N_SUPPORTED_LANGUAGES)[number]

export const isAppLanguage = (value: string | null): value is AppLanguage =>
	value !== null &&
	(I18N_SUPPORTED_LANGUAGES as readonly string[]).includes(value)

export const getStoredLanguage = (): AppLanguage => {
	if (typeof window === 'undefined') {
		return I18N_DEFAULT_LANGUAGE
	}

	const storedLanguage = window.localStorage.getItem(I18N_STORAGE_KEY)

	return isAppLanguage(storedLanguage) ? storedLanguage : I18N_DEFAULT_LANGUAGE
}

export const persistLanguage = (language: AppLanguage) => {
	if (typeof window === 'undefined') {
		return
	}

	window.localStorage.setItem(I18N_STORAGE_KEY, language)
}
