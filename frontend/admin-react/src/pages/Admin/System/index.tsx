import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Settings, Save, RefreshCw, Shield, Bell } from 'lucide-react'

export function SystemPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <p className="text-muted-foreground">
          管理系统配置和参数设置
        </p>
      </div>

      {/* 基本设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            基本设置
          </CardTitle>
          <CardDescription>
            配置系统的基本信息和参数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">网站名称</Label>
              <Input id="site-name" defaultValue="管理后台" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-url">网站地址</Label>
              <Input id="site-url" defaultValue="https://admin.example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description">网站描述</Label>
            <Input id="site-description" defaultValue="这是一个功能强大的管理后台系统" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="maintenance" />
            <Label htmlFor="maintenance">维护模式</Label>
          </div>
        </CardContent>
      </Card>

      {/* 安全设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            安全设置
          </CardTitle>
          <CardDescription>
            配置系统安全相关参数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">会话超时时间（分钟）</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">最大登录尝试次数</Label>
              <Input id="max-login-attempts" type="number" defaultValue="5" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="two-factor" />
            <Label htmlFor="two-factor">启用双因素认证</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="password-policy" />
            <Label htmlFor="password-policy">启用密码策略</Label>
          </div>
        </CardContent>
      </Card>

      {/* 通知设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            通知设置
          </CardTitle>
          <CardDescription>
            配置系统通知和提醒设置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>邮件通知</Label>
                <p className="text-sm text-muted-foreground">启用邮件通知功能</p>
              </div>
              <Checkbox id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>系统提醒</Label>
                <p className="text-sm text-muted-foreground">显示系统状态提醒</p>
              </div>
              <Checkbox id="system-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>用户活动通知</Label>
                <p className="text-sm text-muted-foreground">通知用户重要活动</p>
              </div>
              <Checkbox id="user-activity" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          重置
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          保存设置
        </Button>
      </div>
    </div>
  )
}
