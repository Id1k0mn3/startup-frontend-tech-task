import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import {
	I18N_DEFAULT_LANGUAGE,
	I18N_DEFAULT_NS,
	I18N_SUPPORTED_LANGUAGES
} from './i18nConstants'
import { getStoredLanguage, isAppLanguage, persistLanguage } from './language'
import { resources } from './locales'

const initialLanguage = getStoredLanguage()

i18n.use(initReactI18next).init({
	resources: resources,
	lng: initialLanguage,
	fallbackLng: I18N_DEFAULT_LANGUAGE,
	supportedLngs: [...I18N_SUPPORTED_LANGUAGES],
	load: 'languageOnly',
	interpolation: {
		escapeValue: false
	},
	defaultNS: I18N_DEFAULT_NS
})

i18n.on('languageChanged', language => {
	if (typeof document !== 'undefined') {
		document.documentElement.lang = language
	}

	if (isAppLanguage(language)) {
		persistLanguage(language)
	}
})

if (typeof document !== 'undefined') {
	document.documentElement.lang = initialLanguage
}
