package main

import (
	"os/exec"

	"web_backend.com/m/v2/tools"
)

func main() {
	// 执行 swag fmt 命令
	if err := runCommand("swag", "fmt"); err != nil {
		tools.LogError(err.Error())
		return
	}

	// 执行 swag init 命令
	dir := "./cmd/server,./cmd/server,./internal/app/controllers,./internal/app/models,./internal/pkg/network" // 需要注释转换swagger的文件
	if err := runCommand("swag", "init", "--dir", dir, "-o", "./api/swagger"); err != nil {
		tools.LogError(err.Error())
		return
	}
	tools.LogInfo("swagger文档生成成功！")

}
func runCommand(name string, args ...string) error {
	// 创建命令对象
	cmd := exec.Command(name, args...)
	// 获取命令的标准输出和标准错误
	output, err := cmd.CombinedOutput()
	tools.LogDebug(string(output))
	return err
}
