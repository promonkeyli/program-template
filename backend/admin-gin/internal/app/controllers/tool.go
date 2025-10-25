package controllers

import (
	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/internal/app/models"
	"web_backend.com/m/v2/internal/app/repositories"
	"web_backend.com/m/v2/internal/pkg/network"
)

type ToolController struct {
}

//	ToolListController
//
// @Summary		工具列表
// @Description	获取工具
// @Tags			tool
// @Accept			json
// @Produce		json
// @Success		200	{object}	network.Response
// @Failure		400	string		"参数错误！"
// @Failure		500	string		"服务器错误！"
// @Router			/tools [get]
// @Security		ApiKeyAuth
func (T ToolController) ToolListController(c *gin.Context) {
	toolList, err := repositories.QueryToolList()
	if err != nil {
		network.HandleError(c, network.StatusInternalServerError, err.Error())
		return
	}
	network.HandleOk(c, network.StatusOK, network.StatusOK.String(), toolList)
}

//	ToolAddController
//
// @Summary		工具新增
// @Description	添加工具
// @Tags			tool
// @Accept			json
// @Produce		json
// @Param			tool	body		models.Tool	true	"工具新增"
// @Success		200		{object}	network.Response
// @Failure		400		string		"参数错误！"
// @Failure		500		string		"服务器错误！"
// @Router			/tools [post]
// @Security		ApiKeyAuth
func (T ToolController) ToolAddController(c *gin.Context) {
	// 接受json格式数据，使用map
	var tool models.Tool
	err := c.BindJSON(&tool)
	repositories.CreateToolItem(tool)
	if err == nil {
		network.HandleOk(c, network.StatusOK, network.StatusOK.String(), tool)
		return
	}
	network.HandleError(c, network.StatusInternalServerError, err.Error())
}
