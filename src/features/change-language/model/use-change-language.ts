import { useTranslation } from 'react-i18next'

import {
	type AppLanguage,
	I18N_DEFAULT_LANGUAGE,
	isAppLanguage
} from '@/shared/i18n'

export const useChangeLanguage = () => {
	const { i18n } = useTranslation('common')
	const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language
	const language = isAppLanguage(resolvedLanguage)
		? resolvedLanguage
		: I18N_DEFAULT_LANGUAGE

	const changeLanguage = (nextLanguage: AppLanguage) => {
		void i18n.changeLanguage(nextLanguage)
	}

	return {
		changeLanguage,
		language
	}
}
