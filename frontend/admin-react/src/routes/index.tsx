import { Breadcrumb } from '@/components/Layout/Breadcrumb'
import { Header } from '@/components/Layout/Header'
import { Sidebar } from '@/components/Layout/Sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: IndexLayout,
})

function IndexLayout(){
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧边栏 */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        {/* 面包屑导航 */}
        <Breadcrumb />
        
        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
