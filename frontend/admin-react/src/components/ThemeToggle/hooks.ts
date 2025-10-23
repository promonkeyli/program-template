import { useThemeStore } from '@/stores/theme'

export function useThemeToggle() {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'sun'
      case 'dark':
        return 'moon'
      case 'system':
        return 'monitor'
      default:
        return 'sun'
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    getThemeIcon,
  }
}
