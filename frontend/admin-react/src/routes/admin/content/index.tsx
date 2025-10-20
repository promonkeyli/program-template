import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/pages/Admin/Content'

export const Route = createFileRoute('/admin/content/')({
  component: ContentPage,
})
