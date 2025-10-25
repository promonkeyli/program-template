// router/auth.go: 权限相关路由
package router

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/app/controllers"
)

func GenAuthRouter(r *gin.RouterGroup) {
	r.POST("/logout", controllers.AuthController{}.AuthLogOutController)
}

func GenLoginRouter(r *gin.RouterGroup) {
	r.POST("/login", controllers.AuthController{}.AuthLoginController)
}
