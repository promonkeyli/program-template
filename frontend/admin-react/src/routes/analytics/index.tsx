import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsPage } from '@/pages/Analytics'

export const Route = createFileRoute('/analytics/')({
  component: AnalyticsPage,
})