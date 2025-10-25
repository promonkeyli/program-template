// router/swagger.go: swagger文档相关路由
package router

import (
	"os"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	docs "web_backend.com/m/v2/api/swagger"
)

func GenSwaggerRouter(r *gin.RouterGroup) {
	var Host string
	if os.Getenv("GIN_MODE") == gin.ReleaseMode {
		Host = "api.promonkeyli.top"
	} else {
		Host = "127.0.0.1:8081"
	}
	// 动态设置 swagger 环境url以及http协议
	docs.SwaggerInfo.Host = Host
	docs.SwaggerInfo.BasePath = "/v1"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
