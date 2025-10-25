// router/router.go: 路由入口
package router

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/pkg/middleware"
)

func Router(r *gin.Engine) {
	// v1 版本
	v1 := r.Group("/v1")
	{
		// 不需要授权: swagger文档和login不需要jwt权限校验
		GenSwaggerRouter(v1)
		GenLoginRouter(v1)
		// 需要授权，使用自定义JWT中间件
		v1.Use(middleware.JWT())
		GenAuthRouter(v1)
		GenUserRouter(v1)
		GenToolRouter(v1)
	}
}
