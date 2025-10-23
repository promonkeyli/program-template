import { useI18nStore } from '@/stores/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function useLanguageToggle() {
  const { language, setLanguage } = useI18nStore()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const getLanguageLabel = () => {
    switch (language) {
      case 'zh':
        return '中文'
      case 'en':
        return 'English'
      default:
        return '中文'
    }
  }

  const getLanguageFlag = () => {
    switch (language) {
      case 'zh':
        return '🇨🇳'
      case 'en':
        return '🇺🇸'
      default:
        return '🇨🇳'
    }
  }

  return {
    language,
    setLanguage,
    getLanguageLabel,
    getLanguageFlag,
  }
}
