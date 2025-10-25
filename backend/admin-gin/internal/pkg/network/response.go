package network

// Response 常规响应实体封装
// swagger:model Response
type Response struct {
	/* 响应码 */
	Code StatusCode `json:"code"`
	/* 响应描述 */
	Message string `json:"message"`
	/* 响应数据(可以为空) */
	Data interface{} `json:"data,omitempty"`
	/* 响应时间戳 */
	Time int64 `json:"time"`
}

// PageResponse 列表响应实体封装
// swagger:model PageResponse
type PageResponse struct {
	/* 响应码 */
	Code StatusCode `json:"code"`
	/* 响应描述 */
	Message string `json:"message"`
	/* 响应数据(可以为空) */
	Data interface{} `json:"data,omitempty"`
	/* 响应时间戳 */
	Time int64 `json:"time"`
	/* 响应分页页码 */
	Page int `json:"page"`
	/* 响应分页大小 */
	Size int `json:"size"`
	/* 响应分页总条数 */
	Total int `json:"total"`
}
