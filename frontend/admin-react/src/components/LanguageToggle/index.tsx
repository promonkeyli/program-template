import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'
import { useLanguageToggle } from './hooks'
import type { LanguageToggleProps } from './types'

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage, getLanguageLabel, getLanguageFlag } = useLanguageToggle()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 ${className || ''}`}>
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('header.languageToggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('zh')}>
          <span>🇨🇳 中文</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <span>🇺🇸 English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
