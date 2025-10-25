// router/user.go: 用户相关路由
package router

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/app/controllers"
)

func GenUserRouter(r *gin.RouterGroup) {
	user := r.Group("/users")
	{
		user.GET("", controllers.UserController{}.UserListController)
		user.POST("", controllers.UserController{}.UserAddController)
	}
}
