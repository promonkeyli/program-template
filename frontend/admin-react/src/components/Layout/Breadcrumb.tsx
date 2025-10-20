import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

// 路由路径到中文名称的映射
const routeNames: Record<string, string> = {
  '/': '仪表盘',
  '/users': '用户管理',
  '/users/roles': '角色管理',
  '/content': '内容管理',
  '/content/articles': '文章管理',
  '/content/categories': '分类管理',
  '/analytics': '数据分析',
  '/system': '系统设置',
  '/system/config': '系统配置',
  '/system/notifications': '通知管理',
  '/system/messages': '消息管理',
}

export function Breadcrumb() {
  const location = useLocation()
  const navigate = useNavigate()

  // 生成面包屑路径
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = [
      {
        label: '首页',
        path: '/',
        isActive: location.pathname === '/'
      }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      
      breadcrumbs.push({
        label: routeNames[currentPath] || segment,
        path: currentPath,
        isActive: isLast
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center space-x-1 px-6 py-3 bg-muted/30 border-b border-border">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          )}
          <Button
            variant={breadcrumb.isActive ? "default" : "ghost"}
            size="sm"
            className={`
              h-7 px-2 text-sm font-normal
              ${breadcrumb.isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
              }
            `}
            onClick={() => !breadcrumb.isActive && navigate({ to: breadcrumb.path })}
          >
            {index === 0 && <Home className="h-3 w-3 mr-1" />}
            {breadcrumb.label}
          </Button>
        </div>
      ))}
    </nav>
  )
}
