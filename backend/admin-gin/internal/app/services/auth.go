package services

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/app/models"
	"web_backend.com/m/v2/internal/app/repositories"
	"web_backend.com/m/v2/internal/pkg/network"
	"web_backend.com/m/v2/tools"
)

// 登录授权业务逻辑
func LoginService(c *gin.Context, userData models.User) {
	user, err := repositories.QuerySingleUser(userData.UserName)
	if err != nil {
		network.HandleError(c, network.StatusInternalServerError, err.Error())
	} else {
		p := userData.Password
		if p == user.Password {
			// 签发token
			token, e := tools.GenerateToken(p)
			if e != nil {
				network.HandleError(c, network.StatusInternalServerError, "Token Error")
			} else {
				network.HandleOk(c, network.StatusOK, network.StatusOK.String(), token)
			}

		} else {
			network.HandleError(c, network.StatusBadRequest, "密码错误，请重新输入！")
		}

	}
}
