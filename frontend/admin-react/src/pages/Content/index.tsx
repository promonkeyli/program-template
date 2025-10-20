import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'

export function ContentPage() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
          <p className="text-muted-foreground">
            管理网站文章和内容
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardHeader>
          <CardTitle>搜索内容</CardTitle>
          <CardDescription>
            根据标题、内容或分类搜索文章
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="搜索文章..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 文章列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            文章列表
          </CardTitle>
          <CardDescription>
            显示所有已发布的文章
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 示例文章数据 */}
            {[
              { 
                id: 1, 
                title: 'React 18 新特性详解', 
                category: '技术文章', 
                author: '张三', 
                publishDate: '2024-01-15',
                status: '已发布',
                views: 1234
              },
              { 
                id: 2, 
                title: 'TypeScript 最佳实践', 
                category: '编程指南', 
                author: '李四', 
                publishDate: '2024-01-14',
                status: '草稿',
                views: 567
              },
              { 
                id: 3, 
                title: '前端性能优化技巧', 
                category: '性能优化', 
                author: '王五', 
                publishDate: '2024-01-13',
                status: '已发布',
                views: 890
              },
            ].map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{article.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>分类: {article.category}</span>
                    <span>作者: {article.author}</span>
                    <span>发布时间: {article.publishDate}</span>
                    <span>阅读量: {article.views}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    article.status === '已发布' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
