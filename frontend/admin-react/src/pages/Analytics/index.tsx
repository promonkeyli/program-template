import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Users, Eye, Clock, Download } from 'lucide-react'

export function AnalyticsPage() {
  const metrics = [
    {
      title: '总访问量',
      value: '125,430',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: '独立访客',
      value: '45,230',
      change: '+8.2%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: '平均停留时间',
      value: '3:45',
      change: '+15.3%',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: '跳出率',
      value: '32.1%',
      change: '-5.2%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据分析</h1>
          <p className="text-muted-foreground">
            查看网站访问数据和用户行为分析
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          导出报告
        </Button>
      </div>

      {/* 关键指标 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span> 较上月
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>访问趋势</CardTitle>
            <CardDescription>
              最近30天的访问量变化趋势
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>访问趋势图表</p>
                <p className="text-sm">这里将显示访问量趋势图</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户来源</CardTitle>
            <CardDescription>
              用户访问来源分布
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>用户来源图表</p>
                <p className="text-sm">这里将显示用户来源分布图</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细数据表格 */}
      <Card>
        <CardHeader>
          <CardTitle>页面访问排行</CardTitle>
          <CardDescription>
            最受欢迎的页面访问统计
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { page: '/', views: 15420, visitors: 8930, bounceRate: '28.5%' },
              { page: '/users', views: 12340, visitors: 6780, bounceRate: '35.2%' },
              { page: '/content', views: 9870, visitors: 5430, bounceRate: '42.1%' },
              { page: '/analytics', views: 7650, visitors: 4320, bounceRate: '38.7%' },
              { page: '/system', views: 5430, visitors: 3210, bounceRate: '45.3%' },
            ].map((item, index) => (
              <div key={item.page} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.page}</p>
                    <p className="text-sm text-muted-foreground">页面路径</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{item.views.toLocaleString()}</p>
                    <p className="text-muted-foreground">访问量</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{item.visitors.toLocaleString()}</p>
                    <p className="text-muted-foreground">访客数</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{item.bounceRate}</p>
                    <p className="text-muted-foreground">跳出率</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
