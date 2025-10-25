package repositories

import (
	"web_backend.com/m/v2/internal/app/models"
	"web_backend.com/m/v2/internal/database"
)

func QueryToolList() ([]models.Tool, error) {
	var tool []models.Tool
	db := database.GetDB().Find(&tool)
	if db.Error != nil {
		return []models.Tool{}, db.Error
	}
	return tool, nil
}

func CreateToolItem(tool models.Tool) (models.Tool, error) {
	db := database.GetDB().Create(&tool)
	if db.Error != nil {
		return models.Tool{}, db.Error
	}
	return tool, nil
}
