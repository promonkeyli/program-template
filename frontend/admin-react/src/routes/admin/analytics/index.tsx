import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsPage } from '@/pages/Admin/Analytics/index'

export const Route = createFileRoute('/admin/analytics/')({
  component: AnalyticsPage,
})