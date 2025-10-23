import { Maximize, Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFullscreen } from '@/hooks/useFullscreen'
import { useTranslation } from 'react-i18next'
import type { FullscreenToggleProps } from './types'

export function FullscreenToggle({ className }: FullscreenToggleProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const { t } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className || ''}`}
      onClick={toggleFullscreen}
      title={isFullscreen ? t('common.exitFullscreen') : t('common.fullscreen')}
    >
      {isFullscreen ? (
        <Minimize className="h-4 w-4" />
      ) : (
        <Maximize className="h-4 w-4" />
      )}
      <span className="sr-only">
        {isFullscreen ? t('common.exitFullscreen') : t('common.fullscreen')}
      </span>
    </Button>
  )
}
