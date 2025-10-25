package network

import (
	"time"

	"github.com/gin-gonic/gin"
)

// 构建响应对象
func gengrateResponse(code StatusCode, message string, data interface{}) Response {
	return Response{
		Code:    code,
		Message: message,
		Data:    data,
		Time:    time.Now().UnixMilli(),
	}
}

// 成功时调用
func HandleOk(c *gin.Context, code StatusCode, message string, data interface{}) {
	res := gengrateResponse(code, message, data)
	c.JSON(int(code), res)
}

// 失败时调用
func HandleError(c *gin.Context, code StatusCode, message string) {
	res := gengrateResponse(code, message, nil)
	c.JSON(int(code), res)
}
