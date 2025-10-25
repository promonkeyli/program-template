// internal/database/database.go: 数据库连接
package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"web_backend.com/m/v2/internal/config"
	"web_backend.com/m/v2/tools"
)

var (
	db  *gorm.DB
	err error
)

func Init() {
	dsn := config.GetDSN()
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		tools.LogError("数据库连接失败%s", err)
		return
	}
	tools.LogInfo("数据库连接成功")
}

// 通过函数安全访问数据库实例
func GetDB() *gorm.DB {
	return db
}
