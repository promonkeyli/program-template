package models

// User represents a tool entity
// @Description User represents a user entity
type User struct {
	UserName string `json:"userName" gorm:"column:userName"`
	Password string `json:"password" gorm:"column:password"`
}

// TableName 自定义表名
func (User) TableName() string {
	return "user"
}
