# Go 项目最佳编程风格实践指南

本文档描述了 Go 项目当前最流行、最推荐的最佳编程风格实践，基于 Go 官方规范、社区最佳实践和知名企业的代码审查标准。

> **更新时间**: 2024-2025  
> **参考来源**: Go Code Review Comments、Effective Go、Google Go Style Guide、Uber Go Style Guide

---

## 📋 目录

- [代码格式化](#代码格式化)
- [命名规范](#命名规范)
- [注释规范](#注释规范)
- [错误处理](#错误处理)
- [接口设计](#接口设计)
- [并发编程](#并发编程)
- [包设计](#包设计)
- [函数设计](#函数设计)
- [类型定义](#类型定义)
- [性能优化](#性能优化)
- [测试实践](#测试实践)
- [安全实践](#安全实践)
- [代码组织](#代码组织)
- [常见陷阱](#常见陷阱)

---

## 代码格式化

### 使用 gofmt 和 goimports

**规则**: 所有代码必须使用 `gofmt` 格式化，使用 `goimports` 管理导入。

#### ✅ 推荐做法

```go
// 使用 gofmt 格式化代码
// 使用 goimports 自动管理导入
import (
    "context"
    "fmt"
    "time"
    
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)
```

#### ❌ 避免做法

```go
// 手动格式化，格式不一致
import ("fmt";"time")
import "context"
```

### 导入顺序

**规则**: 导入包按标准库、第三方库、本地包分组，组内按字母排序。

```go
import (
    // 标准库
    "context"
    "fmt"
    "time"
    
    // 第三方库
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    
    // 本地包
    "web_backend.com/m/v2/internal/app/models"
    "web_backend.com/m/v2/pkg/utils"
)
```

### 代码缩进

**规则**: 使用 Tab 缩进，不使用空格。

```go
// ✅ 正确：使用 Tab
func main() {
    if err != nil {
        return err
    }
}

// ❌ 错误：使用空格
func main() {
    if err != nil {
        return err
    }
}
```

---

## 命名规范

### 包名

**规则**: 
- 使用简短、小写、单数形式的名称
- 避免下划线或混合大小写
- 包名应该与目录名一致

#### ✅ 推荐做法

```go
package user
package auth
package utils
package middleware
```

#### ❌ 避免做法

```go
package user_handler  // 避免下划线
package User         // 避免大写开头
package users        // 避免复数形式（除非特殊含义）
```

### 变量名

**规则**:
- 使用驼峰命名（camelCase）
- 首字母小写表示私有，大写表示导出
- 简短且有意义
- 布尔变量使用 `is`、`has`、`can` 等前缀

#### ✅ 推荐做法

```go
var (
    userName    string  // 私有变量
    UserName    string  // 导出变量
    isActive    bool    // 布尔值
    hasPermission bool
    canEdit     bool
)
```

#### 简短变量名

**规则**: 在短作用域内可以使用简短变量名。

```go
// ✅ 推荐：短作用域
for i := 0; i < 10; i++ {
    // ...
}

// ✅ 推荐：常见缩写
ctx context.Context
req *http.Request
resp *http.Response
db  *gorm.DB
err error
```

### 函数名

**规则**:
- 使用驼峰命名
- Getter 函数不需要 `Get` 前缀
- Setter 函数使用 `Set` 前缀
- 返回布尔值的函数使用 `Is`、`Has`、`Can` 等前缀

#### ✅ 推荐做法

```go
// Getter
func Name() string { return u.name }

// Setter
func SetName(name string) { u.name = name }

// 布尔值检查
func IsActive() bool { return u.active }
func HasPermission() bool { return u.permission }
func CanEdit() bool { return u.canEdit }

// 业务函数
func CreateUser(ctx context.Context, user *User) error
func DeleteUser(ctx context.Context, id uint) error
```

#### ❌ 避免做法

```go
// ❌ 避免：Getter 使用 Get 前缀
func GetName() string

// ❌ 避免：命名不清晰
func Do() error
func Process() error
```

### 常量名

**规则**:
- 使用全大写字母，单词间用下划线分隔
- 私有常量首字母小写

#### ✅ 推荐做法

```go
const (
    MaxRetries     = 3
    DefaultTimeout = 30 * time.Second
    StatusOK       = 200
)

const (
    maxConnections = 100  // 私有常量
    defaultPort    = 8080
)
```

### 接口名

**规则**:
- 接口名通常是动词 + `er` 结尾
- 单个方法的接口，方法名去掉 `er` 后缀

#### ✅ 推荐做法

```go
// 多个方法的接口
type Reader interface {
    Read([]byte) (int, error)
}

type Writer interface {
    Write([]byte) (int, error)
}

// 单个方法的接口，方法名即为接口名
type Stringer interface {
    String() string
}
```

### 错误变量

**规则**: 错误变量使用 `Err` 前缀。

#### ✅ 推荐做法

```go
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrInvalidInput = errors.New("invalid input")
)
```

---

## 注释规范

### 包注释

**规则**: 每个包都应该有包注释，说明包的用途。

#### ✅ 推荐做法

```go
// Package user 提供用户相关的业务逻辑和数据处理功能。
// 包括用户的创建、查询、更新、删除等操作。
package user
```

### 导出函数注释

**规则**: 所有导出的函数、类型、变量都应该有注释。

#### ✅ 推荐做法

```go
// CreateUser 创建新用户。
// ctx 是上下文，用于控制请求的生命周期。
// user 是用户信息，包含用户名、邮箱等字段。
// 返回创建的用户 ID 和可能的错误。
func CreateUser(ctx context.Context, user *User) (uint, error) {
    // ...
}

// User 表示系统中的用户实体。
type User struct {
    ID       uint   `json:"id"`
    Username string `json:"username"`
    Email    string `json:"email"`
}

// MaxRetries 表示最大重试次数。
const MaxRetries = 3
```

### 注释格式

**规则**: 
- 注释应该是完整的句子
- 以被注释的对象名称开头
- 使用句号结尾

#### ✅ 推荐做法

```go
// CreateUser 创建新用户。
func CreateUser(ctx context.Context, user *User) error

// User 表示系统中的用户。
type User struct {
    // Username 是用户的登录名。
    Username string
}
```

#### ❌ 避免做法

```go
// 创建用户  // ❌ 不完整，缺少对象名
func CreateUser(...)

// user struct  // ❌ 格式不规范
type User struct {
    // username  // ❌ 注释不完整
    Username string
}
```

### 内联注释

**规则**: 复杂逻辑需要内联注释说明。

```go
// ✅ 推荐：复杂逻辑添加注释
func calculatePrice(quantity int, price float64) float64 {
    // 应用批量折扣：超过 100 件打 9 折
    if quantity > 100 {
        price *= 0.9
    }
    
    // 计算总价并四舍五入到两位小数
    total := float64(quantity) * price
    return math.Round(total*100) / 100
}
```

---

## 错误处理

### 错误检查

**规则**: 始终检查并处理错误，不要忽略错误。

#### ✅ 推荐做法

```go
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return fmt.Errorf("failed to open file %s: %w", filename, err)
    }
    defer file.Close()
    
    // 处理文件...
    return nil
}
```

#### ❌ 避免做法

```go
// ❌ 错误：忽略错误
file, _ := os.Open(filename)

// ❌ 错误：只打印错误
file, err := os.Open(filename)
if err != nil {
    log.Println(err)
}
```

### 错误包装

**规则**: 使用 `fmt.Errorf` 和 `%w` 动词包装错误，保留错误链。

#### ✅ 推荐做法

```go
func readConfig(filename string) (*Config, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return nil, fmt.Errorf("failed to read config file %s: %w", filename, err)
    }
    
    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }
    
    return &config, nil
}
```

### 错误判断

**规则**: 使用 `errors.Is` 和 `errors.As` 判断错误类型。

#### ✅ 推荐做法

```go
import (
    "errors"
    "os"
)

var ErrNotFound = errors.New("not found")

func findUser(id uint) (*User, error) {
    user, err := db.GetUser(id)
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, ErrNotFound
    }
    if err != nil {
        return nil, fmt.Errorf("database error: %w", err)
    }
    return user, nil
}

// 使用 errors.As 提取错误类型
func handleError(err error) {
    var pathErr *os.PathError
    if errors.As(err, &pathErr) {
        fmt.Printf("Path error: %s\n", pathErr.Path)
    }
}
```

### 错误变量

**规则**: 定义导出的错误变量，便于错误判断。

```go
var (
    ErrNotFound     = errors.New("user not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrInvalidInput = errors.New("invalid input")
)

func GetUser(id uint) (*User, error) {
    if id == 0 {
        return nil, ErrInvalidInput
    }
    // ...
}
```

### 错误返回

**规则**: 错误应该是最后一个返回值。

```go
// ✅ 正确：错误是最后一个返回值
func GetUser(id uint) (*User, error)

// ❌ 错误：错误不是最后一个返回值
func GetUser(id uint) (error, *User)
```

---

## 接口设计

### 接口大小

**规则**: 接口应该小而专注，通常只有 1-3 个方法。

#### ✅ 推荐做法

```go
// 小而专注的接口
type Reader interface {
    Read([]byte) (int, error)
}

type Writer interface {
    Write([]byte) (int, error)
}

type Closer interface {
    Close() error
}

// 组合接口
type ReadWriter interface {
    Reader
    Writer
}
```

#### ❌ 避免做法

```go
// ❌ 避免：接口过大
type UserService interface {
    CreateUser(*User) error
    GetUser(uint) (*User, error)
    UpdateUser(*User) error
    DeleteUser(uint) error
    ListUsers() ([]*User, error)
    SearchUsers(string) ([]*User, error)
    // ... 更多方法
}
```

### 接口命名

**规则**: 接口名通常是动词 + `er` 结尾。

```go
type Reader interface {
    Read([]byte) (int, error)
}

type Writer interface {
    Write([]byte) (int, error)
}

type Stringer interface {
    String() string
}
```

### 接口定义位置

**规则**: 接口定义在使用者的包中，而不是实现者的包中。

#### ✅ 推荐做法

```go
// 在 user 包中定义接口
package user

type Repository interface {
    Create(ctx context.Context, user *User) error
    GetByID(ctx context.Context, id uint) (*User, error)
}

type Service struct {
    repo Repository
}

// 在 mysql 包中实现接口
package mysql

type UserRepository struct {
    db *gorm.DB
}

func (r *UserRepository) Create(ctx context.Context, user *user.User) error {
    // 实现...
}
```

### 接受接口，返回结构

**规则**: 函数应该接受接口，返回具体类型。

```go
// ✅ 推荐：接受接口
func ProcessData(r io.Reader) ([]byte, error) {
    // ...
}

// ✅ 推荐：返回具体类型
func NewUserService(repo Repository) *UserService {
    return &UserService{repo: repo}
}
```

---

## 并发编程

### Goroutine 生命周期

**规则**: 确保所有 goroutine 都能正确退出，避免 goroutine 泄漏。

#### ✅ 推荐做法

```go
func processWithContext(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return // 正确退出
        case data := <-inputChan:
            process(data)
        }
    }
}

// 使用 WaitGroup 等待 goroutine 完成
func processParallel(items []Item) error {
    var wg sync.WaitGroup
    errChan := make(chan error, len(items))
    
    for _, item := range items {
        wg.Add(1)
        go func(i Item) {
            defer wg.Done()
            if err := processItem(i); err != nil {
                errChan <- err
            }
        }(item)
    }
    
    wg.Wait()
    close(errChan)
    
    // 检查错误...
    return nil
}
```

### Channel 使用

**规则**: 
- 明确 channel 的方向（发送或接收）
- 由发送方关闭 channel
- 使用缓冲 channel 避免阻塞

#### ✅ 推荐做法

```go
// 明确 channel 方向
func producer(ch chan<- string) {
    defer close(ch)
    for i := 0; i < 10; i++ {
        ch <- fmt.Sprintf("item-%d", i)
    }
}

func consumer(ch <-chan string) {
    for item := range ch {
        fmt.Println(item)
    }
}

// 使用缓冲 channel
results := make(chan Result, 100) // 避免阻塞
```

### 互斥锁

**规则**: 
- 使用 `sync.Mutex` 保护共享资源
- 使用 `defer` 确保解锁
- 锁的粒度尽可能小

#### ✅ 推荐做法

```go
type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}
```

### Context 使用

**规则**: 
- 将 `context.Context` 作为第一个参数传递
- 使用 `context` 控制超时和取消
- 不要将 `context` 存储在结构体中

#### ✅ 推荐做法

```go
func processUser(ctx context.Context, userID uint) (*User, error) {
    // 创建带超时的 context
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()
    
    // 使用 context 控制请求
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    
    // 检查 context 是否已取消
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
        // 继续处理...
    }
    
    return user, nil
}
```

---

## 包设计

### 包职责

**规则**: 每个包应该有单一的、明确的职责。

```go
// ✅ 推荐：职责单一
package user    // 用户相关
package auth    // 认证相关
package utils   // 工具函数

// ❌ 避免：职责混乱
package common  // 不明确
package helper  // 不明确
```

### 包大小

**规则**: 包应该足够大以提供有用的功能，但不要太大。

- **小包**: 10-20 个文件，500-1000 行代码
- **中包**: 20-50 个文件，1000-5000 行代码
- **大包**: 50+ 个文件，5000+ 行代码（考虑拆分）

### 导入路径

**规则**: 使用清晰的导入路径，避免循环依赖。

```go
// ✅ 推荐：清晰的导入路径
import (
    "web_backend.com/m/v2/internal/app/user"
    "web_backend.com/m/v2/pkg/utils"
)

// ❌ 避免：循环依赖
// package a 导入 package b
// package b 导入 package a
```

### 导出规则

**规则**: 
- 只导出必要的类型和函数
- 使用首字母大小写控制导出
- 导出前考虑是否真的需要导出

```go
// ✅ 推荐：只导出必要的
package user

// 导出：外部需要使用
type User struct {
    ID   uint
    Name string
}

func NewUser(name string) *User {
    return &User{Name: name}
}

// 不导出：内部使用
type userService struct {
    // ...
}

func validateUser(u *User) error {
    // ...
}
```

---

## 函数设计

### 函数长度

**规则**: 函数应该尽可能短小，通常不超过 50 行。

#### ✅ 推荐做法

```go
// 短小、职责单一的函数
func CreateUser(ctx context.Context, user *User) error {
    if err := validateUser(user); err != nil {
        return err
    }
    
    if err := saveUser(ctx, user); err != nil {
        return err
    }
    
    return nil
}

func validateUser(user *User) error {
    if user.Name == "" {
        return errors.New("name is required")
    }
    return nil
}

func saveUser(ctx context.Context, user *User) error {
    // 保存用户...
    return nil
}
```

### 参数数量

**规则**: 函数参数应该尽可能少，超过 3 个参数考虑使用结构体。

#### ✅ 推荐做法

```go
// 多个参数使用结构体
type CreateUserRequest struct {
    Name     string
    Email    string
    Password string
    Role     string
}

func CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error) {
    // ...
}
```

#### ❌ 避免做法

```go
// ❌ 避免：参数过多
func CreateUser(ctx context.Context, name, email, password, role string, age int, isActive bool) (*User, error) {
    // ...
}
```

### 返回值

**规则**: 
- 函数通常返回错误作为最后一个值
- 多个返回值使用命名返回值提高可读性

```go
// ✅ 推荐：命名返回值
func parseConfig(filename string) (config *Config, err error) {
    // ...
    return config, nil
}

// ✅ 推荐：错误作为最后一个返回值
func GetUser(id uint) (*User, error)
```

### Defer 使用

**规则**: 使用 `defer` 确保资源释放和清理操作。

```go
// ✅ 推荐：使用 defer
func readFile(filename string) ([]byte, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close() // 确保关闭
    
    return io.ReadAll(file)
}

// ✅ 推荐：defer 用于解锁
func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}
```

---

## 类型定义

### 结构体

**规则**: 
- 使用有意义的结构体名称
- 字段名使用驼峰命名
- 导出字段使用大写，私有字段使用小写

#### ✅ 推荐做法

```go
type User struct {
    ID       uint   `json:"id" gorm:"primaryKey"`
    Username string `json:"username" gorm:"uniqueIndex"`
    Email    string `json:"email" gorm:"uniqueIndex"`
    password string `json:"-"` // 私有字段，不导出
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
```

### 方法接收器

**规则**: 
- 方法接收器名称应该简短，通常是类型的首字母
- 接收器类型应该是指针类型（需要修改）或值类型（不需要修改）

#### ✅ 推荐做法

```go
type User struct {
    Name string
}

// 需要修改接收器，使用指针
func (u *User) SetName(name string) {
    u.Name = name
}

// 不需要修改，使用值
func (u User) Name() string {
    return u.Name
}

// 接收器名称使用类型首字母
func (u *User) Update() error
func (s *Service) Process() error
```

### 类型别名 vs 新类型

**规则**: 
- 使用 `type` 定义新类型，而不是类型别名（除非特殊需求）

```go
// ✅ 推荐：新类型
type UserID uint
type Email string

// ❌ 避免：类型别名（除非特殊需求）
type UserID = uint
```

---

## 性能优化

### 字符串拼接

**规则**: 大量字符串拼接使用 `strings.Builder`。

#### ✅ 推荐做法

```go
import "strings"

func buildString(items []string) string {
    var builder strings.Builder
    for _, item := range items {
        builder.WriteString(item)
    }
    return builder.String()
}
```

#### ❌ 避免做法

```go
// ❌ 避免：使用 + 拼接大量字符串
func buildString(items []string) string {
    result := ""
    for _, item := range items {
        result += item  // 性能差
    }
    return result
}
```

### 切片预分配

**规则**: 如果知道切片大小，使用 `make` 预分配容量。

```go
// ✅ 推荐：预分配容量
items := make([]string, 0, 100) // 长度为 0，容量为 100
for i := 0; i < 100; i++ {
    items = append(items, fmt.Sprintf("item-%d", i))
}

// ❌ 避免：不预分配
var items []string
for i := 0; i < 100; i++ {
    items = append(items, fmt.Sprintf("item-%d", i)) // 可能多次扩容
}
```

### 避免不必要的内存分配

**规则**: 避免在循环中创建不必要的对象。

```go
// ✅ 推荐：在循环外创建对象
func processItems(items []Item) {
    var buf bytes.Buffer
    for _, item := range items {
        buf.Reset() // 重置而不是创建新对象
        buf.WriteString(item.Name)
        // ...
    }
}

// ❌ 避免：在循环中创建对象
func processItems(items []Item) {
    for _, item := range items {
        var buf bytes.Buffer // 每次循环都创建新对象
        buf.WriteString(item.Name)
        // ...
    }
}
```

### 使用 sync.Pool

**规则**: 对于频繁创建和销毁的对象，使用 `sync.Pool` 复用。

```go
var bufferPool = sync.Pool{
    New: func() interface{} {
        return &bytes.Buffer{}
    },
}

func getBuffer() *bytes.Buffer {
    return bufferPool.Get().(*bytes.Buffer)
}

func putBuffer(buf *bytes.Buffer) {
    buf.Reset()
    bufferPool.Put(buf)
}
```

---

## 测试实践

### 测试文件命名

**规则**: 测试文件以 `_test.go` 结尾，与被测试文件在同一包中。

```go
// user.go
package user

func CreateUser(name string) (*User, error) {
    // ...
}

// user_test.go
package user

import "testing"

func TestCreateUser(t *testing.T) {
    // ...
}
```

### 测试函数命名

**规则**: 测试函数以 `Test` 开头，使用表驱动测试。

#### ✅ 推荐做法

```go
func TestCreateUser(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    *User
        wantErr bool
    }{
        {
            name:  "valid user",
            input: "John",
            want:  &User{Name: "John"},
            wantErr: false,
        },
        {
            name:  "empty name",
            input: "",
            want:  nil,
            wantErr: true,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := CreateUser(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("CreateUser() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("CreateUser() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### 测试覆盖率

**规则**: 测试覆盖率应该达到 80% 以上。

```bash
# 运行测试并查看覆盖率
go test -cover

# 生成覆盖率报告
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
```

### 基准测试

**规则**: 对于性能敏感的函数，编写基准测试。

```go
func BenchmarkCreateUser(b *testing.B) {
    for i := 0; i < b.N; i++ {
        CreateUser("John")
    }
}

// 运行基准测试
// go test -bench=.
```

### Mock 和测试辅助

**规则**: 使用接口和依赖注入，便于测试和 Mock。

```go
// 定义接口
type Repository interface {
    Create(ctx context.Context, user *User) error
}

// 实现可以使用 Mock
type mockRepository struct {
    users []*User
}

func (m *mockRepository) Create(ctx context.Context, user *User) error {
    m.users = append(m.users, user)
    return nil
}
```

---

## 安全实践

### 密码处理

**规则**: 永远不要明文存储密码，使用 `bcrypt` 或 `argon2` 哈希。

#### ✅ 推荐做法

```go
import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}
```

### SQL 注入防护

**规则**: 使用参数化查询，永远不要拼接 SQL。

#### ✅ 推荐做法

```go
// 使用 GORM（自动参数化）
user := User{Name: name}
db.Create(&user)

// 使用原生 SQL（参数化）
db.Exec("INSERT INTO users (name) VALUES (?)", name)
```

#### ❌ 避免做法

```go
// ❌ 危险：SQL 注入风险
query := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", name)
db.Raw(query)
```

### 敏感信息

**规则**: 不要在日志中输出敏感信息（密码、Token、密钥等）。

```go
// ✅ 推荐：不记录敏感信息
log.Printf("User login attempt: username=%s", username)

// ❌ 避免：记录敏感信息
log.Printf("User login: username=%s, password=%s", username, password)
```

### 输入验证

**规则**: 验证所有用户输入，防止恶意输入。

```go
import "github.com/go-playground/validator/v10"

type CreateUserRequest struct {
    Username string `validate:"required,min=3,max=20"`
    Email    string `validate:"required,email"`
    Password string `validate:"required,min=8"`
}

func ValidateRequest(req *CreateUserRequest) error {
    validate := validator.New()
    return validate.Struct(req)
}
```

---

## 代码组织

### 文件组织

**规则**: 
- 相关代码放在同一文件中
- 文件大小控制在 500 行以内
- 按功能组织文件

```
internal/app/user/
├── user.go          # 类型定义
├── handler.go       # HTTP 处理器
├── service.go       # 业务逻辑
├── repository.go    # 数据访问
└── user_test.go     # 测试
```

### 导入分组

**规则**: 导入按标准库、第三方库、本地包分组。

```go
import (
    // 标准库
    "context"
    "fmt"
    "time"
    
    // 第三方库
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    
    // 本地包
    "web_backend.com/m/v2/internal/app/models"
    "web_backend.com/m/v2/pkg/utils"
)
```

### 常量定义

**规则**: 相关常量放在一起，使用 `const` 块。

```go
const (
    MaxRetries     = 3
    DefaultTimeout = 30 * time.Second
    StatusOK       = 200
    StatusNotFound = 404
)
```

---

## 常见陷阱

### 1. 切片和 Map 的并发访问

**规则**: 切片和 Map 不是并发安全的，需要加锁。

```go
// ❌ 危险：并发访问 Map
var m = make(map[string]int)

func Set(key string, value int) {
    m[key] = value  // 并发不安全
}

// ✅ 安全：使用 sync.Map 或加锁
var m sync.Map

func Set(key string, value int) {
    m.Store(key, value)
}
```

### 2. 循环变量捕获

**规则**: 在 goroutine 中使用循环变量时，需要传递副本。

```go
// ❌ 错误：所有 goroutine 共享同一个变量
for i := 0; i < 10; i++ {
    go func() {
        fmt.Println(i)  // 可能打印 10 次 10
    }()
}

// ✅ 正确：传递副本
for i := 0; i < 10; i++ {
    go func(n int) {
        fmt.Println(n)
    }(i)
}
```

### 3. Defer 和返回值

**规则**: 注意 defer 对命名返回值的影响。

```go
// ✅ 正确：defer 可以修改命名返回值
func example() (result int) {
    defer func() {
        result++  // 可以修改返回值
    }()
    return 0  // 实际返回 1
}

// 注意：非命名返回值不能修改
func example() int {
    defer func() {
        // 不能修改返回值
    }()
    return 0
}
```

### 4. 空接口使用

**规则**: 避免过度使用 `interface{}`，优先使用具体类型或泛型。

```go
// ❌ 避免：过度使用 interface{}
func Process(data interface{}) {
    // 需要类型断言，不够安全
}

// ✅ 推荐：使用具体类型或泛型（Go 1.18+）
func Process[T any](data T) {
    // 类型安全
}
```

---

## 工具推荐

### 代码格式化

```bash
# 格式化代码
gofmt -w .

# 格式化并管理导入
goimports -w .
```

### 静态检查

```bash
# 安装 golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# 运行检查
golangci-lint run
```

### 代码生成

```bash
# 生成 Mock
go install github.com/golang/mock/mockgen@latest

# 生成 Wire 代码
go install github.com/google/wire/cmd/wire@latest
```

---

## 总结

### 核心原则

1. **简洁性**: 代码应该简洁明了，易于理解
2. **可读性**: 代码是给人看的，可读性优先
3. **一致性**: 保持代码风格一致
4. **错误处理**: 明确处理所有错误
5. **性能**: 在保证可读性的前提下优化性能

### 检查清单

- [ ] 代码使用 `gofmt` 格式化
- [ ] 所有导出函数都有注释
- [ ] 错误都被正确处理
- [ ] 没有忽略错误（没有 `_` 忽略）
- [ ] 接口设计小而专注
- [ ] 并发代码正确使用锁和 channel
- [ ] 测试覆盖率达到 80% 以上
- [ ] 没有硬编码的敏感信息
- [ ] 输入都经过验证
- [ ] SQL 查询使用参数化

---

## 参考资源

- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- [Effective Go](https://go.dev/doc/effective_go)
- [Google Go Style Guide](https://google.github.io/styleguide/go/)
- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md)
- [Go 官方文档](https://go.dev/doc/)

---

**最后更新**: 2024-2025  
**文档维护**: 建议每季度更新一次最佳实践

