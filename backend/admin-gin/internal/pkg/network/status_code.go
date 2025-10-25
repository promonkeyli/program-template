package network

import "fmt"

// StatusCode 表示 HTTP 状态码的枚举类型
type StatusCode int

// 定义常见的 HTTP 状态码枚举值
const (
	// Successful responses
	// swagger:enum StatusCode
	StatusOK StatusCode = 200

	// Client error responses
	StatusBadRequest   StatusCode = 400
	StatusUnauthorized StatusCode = 401
	StatusForbidden    StatusCode = 403
	StatusNotFound     StatusCode = 404

	// Server error responses
	StatusInternalServerError StatusCode = 500
	StatusNotImplemented      StatusCode = 501
	StatusBadGateway          StatusCode = 502
	StatusServiceUnavailable  StatusCode = 503
)

// statusCodeToString 存储状态码和对应描述的映射
var statusCodeToString = map[StatusCode]string{
	StatusOK:                  "OK",
	StatusBadRequest:          "Bad Request",
	StatusUnauthorized:        "Unauthorized",
	StatusForbidden:           "Forbidden",
	StatusNotFound:            "Not Found",
	StatusInternalServerError: "Internal Server Error",
	StatusNotImplemented:      "Not Implemented",
	StatusBadGateway:          "Bad Gateway",
	StatusServiceUnavailable:  "Service Unavailable",
}

// String 方法用于将 StatusCode 枚举值转换为对应的描述字符串
func (s StatusCode) String() string {
	if desc, exists := statusCodeToString[s]; exists {
		return desc
	}
	return "Unknown Status"
}

// GetDescription 提供一个公共方法，用于获取状态码的描述，可进行额外的错误处理
func (s StatusCode) GetDescription() (string, error) {
	if desc, exists := statusCodeToString[s]; exists {
		return desc, nil
	}
	return "", fmt.Errorf("unknown status code: %d", s)
}
