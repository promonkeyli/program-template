import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsPage } from '@/pages/Admin/Analytics'

export const Route = createFileRoute('/admin/analytics/')({
  component: AnalyticsPage,
})