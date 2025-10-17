import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userInfo, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">欢迎回来！</CardTitle>
            <CardDescription>
              您已成功登录系统
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">用户名：</p>
              <p className="font-medium">{userInfo?.username}</p>
              <p className="text-sm text-muted-foreground">昵称：</p>
              <p className="font-medium">{userInfo?.nickname}</p>
              <p className="text-sm text-muted-foreground">角色：</p>
              <p className="font-medium">{userInfo?.roles?.join(', ')}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              退出登录
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
