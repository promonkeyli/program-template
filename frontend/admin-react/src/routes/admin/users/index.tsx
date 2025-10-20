import { createFileRoute } from '@tanstack/react-router'
import { UsersPage } from '@/pages/Admin/Users'

export const Route = createFileRoute('/admin/users/')({
  component: UsersPage,
})
