package repositories

import (
	"web_backend.com/m/v2/internal/app/models"
	"web_backend.com/m/v2/internal/database"
)

// QuerySingleUser 单个用户查找
func QuerySingleUser(userName string) (models.User, error) {
	var user models.User
	db := database.GetDB().Where("userName = ?", userName).First(&user)
	if db.Error != nil {
		return models.User{}, db.Error
	}
	return user, nil
}

// QueryAllUser 查找所有用户
func QueryAllUserList() ([]models.User, error) {
	var user []models.User
	db := database.GetDB().Find(&user)
	if db.Error != nil {
		return []models.User{}, db.Error
	}
	return user, nil
}
