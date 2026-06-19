import { useTranslation } from 'react-i18next'

import { type AppLanguage, I18N_SUPPORTED_LANGUAGES } from '@/shared/i18n'

import { useChangeLanguage } from '../model/use-change-language'

const languageLabelKeys = {
	en: 'options.en',
	uk: 'options.uk'
} as const satisfies Record<AppLanguage, 'options.en' | 'options.uk'>

export const LanguageSwitcher = () => {
	const { t } = useTranslation('common')
	const { changeLanguage, language } = useChangeLanguage()

	return (
		<label className="flex items-center gap-2 text-sm font-medium text-gray-600">
			<span>{t('languageSelector.label')}</span>
			<select
				className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition hover:border-gray-400 focus:border-app-orange"
				onChange={event => changeLanguage(event.target.value as AppLanguage)}
				value={language}
			>
				{I18N_SUPPORTED_LANGUAGES.map(option => {
					const labelKey =
						`languageSelector.${languageLabelKeys[option]}` as const

					return (
						<option
							key={option}
							value={option}
						>
							{t(labelKey)}
						</option>
					)
				})}
			</select>
		</label>
	)
}
