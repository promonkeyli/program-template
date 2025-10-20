import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/pages/Admin/Dashboard/index'

export const Route = createFileRoute('/admin/dashboard/')({
  component: DashboardPage,
})
