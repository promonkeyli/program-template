import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/pages/Admin/Content/index'

export const Route = createFileRoute('/admin/content/')({
  component: ContentPage,
})
