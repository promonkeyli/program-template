import { createFileRoute } from '@tanstack/react-router'
import { SystemPage } from '@/pages/Admin/System'

export const Route = createFileRoute('/admin/system/')({
  component: SystemPage,
})
