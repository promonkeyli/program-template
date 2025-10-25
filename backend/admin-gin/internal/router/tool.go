// router/tool.go: 工具相关路由
package router

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/app/controllers"
)

func GenToolRouter(r *gin.RouterGroup) {
	tool := r.Group("/tools")
	{
		tool.GET("", controllers.ToolController{}.ToolListController)
		tool.POST("", controllers.ToolController{}.ToolAddController)
	}
}
