package models

// Tool represents a tool entity
// @Description Tool represents a tool entity
type Tool struct {
	ID       uint   `json:"id,omitempty" gorm:"column:id" swaggerignore:"true"`
	Category string `json:"category" gorm:"column:category"`
	Name     string `json:"name" gorm:"column:name"`
	Url      string `json:"url" gorm:"column:url"`
}

// TableName 自定义表名
func (Tool) TableName() string {
	return "tool"
}


