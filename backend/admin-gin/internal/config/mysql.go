// internal/config/db.go: 当前项目数据库配置文件
package config

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

var dbHost = os.Getenv("DB_HOST")         // 主机名
var dbPort = os.Getenv("DB_PORT")         // 端口号
var dbUser = os.Getenv("DB_USER")         // 用户名
var dbPassword = os.Getenv("DB_PASSWORD") // 密码
var dbName = os.Getenv("DB_NAME")         // 数据库名

// 生产环境数据库连接字符串
var release_mysql = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)

// 本地环境数据库连接字符串
const develop_mysql = "root:ly15984093508@tcp(promonkeyli.top:3306)/website?charset=utf8mb4&parseTime=True&loc=Local"

func GetDSN() string {
	if gin.Mode() == gin.ReleaseMode {
		return release_mysql
	}
	return develop_mysql
}
