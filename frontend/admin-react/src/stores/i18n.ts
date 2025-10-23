import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'zh' | 'en'

interface I18nState {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'zh',
      setLanguage: (language) => {
        set({ language })
      },
      toggleLanguage: () => {
        const currentLanguage = get().language
        const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh'
        set({ language: newLanguage })
      },
    }),
    {
      name: 'i18n-storage',
    }
  )
)
