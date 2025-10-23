import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'
import { useThemeToggle } from './hooks'
import type { ThemeToggleProps } from './types'

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, getThemeIcon } = useThemeToggle()
  const { t } = useTranslation()

  const renderThemeIcon = () => {
    const iconType = getThemeIcon()
    switch (iconType) {
      case 'sun':
        return <Sun className="h-4 w-4" />
      case 'moon':
        return <Moon className="h-4 w-4" />
      case 'monitor':
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 ${className || ''}`}>
          {renderThemeIcon()}
          <span className="sr-only">{t('header.themeToggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>{t('common.light')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>{t('common.dark')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>{t('common.system')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
