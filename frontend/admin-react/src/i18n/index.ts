import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 中文翻译
const zhTranslations = {
  common: {
    search: '搜索...',
    profile: '个人资料',
    settings: '设置',
    logout: '退出登录',
    user: '用户',
    theme: '主题',
    language: '语言',
    fullscreen: '全屏',
    exitFullscreen: '退出全屏',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    chinese: '中文',
    english: 'English',
  },
  header: {
    notifications: '通知',
    themeToggle: '切换主题',
    languageToggle: '切换语言',
    fullscreenToggle: '切换全屏',
  }
}

// 英文翻译
const enTranslations = {
  common: {
    search: 'Search...',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    user: 'User',
    theme: 'Theme',
    language: 'Language',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    chinese: '中文',
    english: 'English',
  },
  header: {
    notifications: 'Notifications',
    themeToggle: 'Toggle Theme',
    languageToggle: 'Toggle Language',
    fullscreenToggle: 'Toggle Fullscreen',
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zhTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    fallbackLng: 'zh',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
