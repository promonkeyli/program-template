# Go 项目技术栈选型指南

本文档描述了 Go 项目当前最流行、企业使用频率最高的技术栈选型，涵盖 Web 框架、ORM、数据库、缓存、日志、错误处理等各个方面。

> **更新时间**: 2024-2025  
> **适用范围**: 企业级 Go 后端项目

---

## 📋 目录

- [Web 框架](#web-框架)
- [ORM](#orm)
- [数据库](#数据库)
- [缓存](#缓存)
- [日志记录](#日志记录)
- [错误处理](#错误处理)
- [配置管理](#配置管理)
- [API 文档](#api-文档)
- [认证授权](#认证授权)
- [其他工具](#其他工具)
- [技术栈组合推荐](#技术栈组合推荐)

---

## Web 框架

### 🥇 推荐：Gin（最流行）

**GitHub**: [gin-gonic/gin](https://github.com/gin-gonic/gin)  
**Stars**: 75k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **性能优秀**: 基于 `httprouter`，性能接近原生 `net/http`
- ✅ **API 简洁**: 学习曲线平缓，API 设计直观
- ✅ **生态丰富**: 中间件、插件众多，社区活跃
- ✅ **文档完善**: 官方文档和示例丰富
- ✅ **企业采用**: 大量知名企业使用（Uber、Docker 等）

#### 适用场景

- 构建 RESTful API
- 微服务架构
- 高并发 Web 应用
- 需要快速开发的项目

#### 安装

```bash
go get -u github.com/gin-gonic/gin
```

#### 示例代码

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    r.Run(":8080")
}
```

---

### 🥈 备选：Echo（高性能）

**GitHub**: [labstack/echo](https://github.com/labstack/echo)  
**Stars**: 30k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **性能极佳**: 基于 `fasthttp`（可选）
- ✅ **API 优雅**: 函数式 API 设计
- ✅ **内置功能**: 支持数据绑定、验证、渲染
- ✅ **轻量级**: 核心功能精简，按需扩展

#### 适用场景

- 对性能要求极高的应用
- 需要简洁 API 的项目
- 微服务架构

---

### 🥉 备选：Fiber（Express 风格）

**GitHub**: [gofiber/fiber](https://github.com/gofiber/fiber)  
**Stars**: 32k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **性能卓越**: 基于 `fasthttp`，性能最佳
- ✅ **Express 风格**: 对于 Node.js 开发者友好
- ✅ **功能全面**: 内置中间件丰富
- ✅ **现代化**: 支持 WebSocket、Server-Sent Events

#### 适用场景

- 从 Node.js 迁移的项目
- 需要极致性能的应用
- WebSocket 实时应用

---

### 其他框架对比

| 框架 | Stars | 性能 | 易用性 | 生态 | 推荐度 |
|------|-------|------|--------|------|--------|
| **Gin** | 75k+ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Echo** | 30k+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Fiber** | 32k+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Beego | 32k+ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Iris | 25k+ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

### 选择建议

- 🎯 **大多数项目**: 选择 **Gin**（最流行，生态最好）
- 🎯 **性能优先**: 选择 **Echo** 或 **Fiber**
- 🎯 **Node.js 背景**: 选择 **Fiber**（风格相似）
- 🎯 **全栈框架**: 选择 **Beego**（内置 ORM、Session 等）

---

## ORM

### 🥇 推荐：GORM（最流行）

**GitHub**: [go-gorm/gorm](https://github.com/go-gorm/gorm)  
**Stars**: 38k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **功能全面**: 支持链式查询、事务、关联、迁移
- ✅ **数据库支持**: MySQL、PostgreSQL、SQLite、SQL Server、ClickHouse
- ✅ **易用性高**: API 设计直观，学习成本低
- ✅ **文档完善**: 官方文档详尽，示例丰富
- ✅ **企业采用**: 大量企业级项目使用

#### 适用场景

- 需要快速开发的项目
- 复杂的数据库操作
- 多数据库支持
- 团队协作项目

#### 安装

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

#### 示例代码

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type User struct {
    ID   uint
    Name string
    Age  int
}

func main() {
    dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }
    
    // 自动迁移
    db.AutoMigrate(&User{})
    
    // 创建
    db.Create(&User{Name: "张三", Age: 25})
    
    // 查询
    var user User
    db.First(&user, 1)
}
```

---

### 🥈 备选：Ent（Facebook 出品）

**GitHub**: [ent/ent](https://github.com/ent/ent)  
**Stars**: 15k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **类型安全**: 代码生成，编译时类型检查
- ✅ **Facebook 维护**: 企业级支持
- ✅ **GraphQL 支持**: 原生支持 GraphQL
- ✅ **现代化设计**: 基于 Schema 定义，代码生成

#### 适用场景

- 大型项目
- 需要类型安全
- GraphQL API
- 复杂数据模型

---

### 🥉 备选：XORM（轻量级）

**GitHub**: [go-xorm/xorm](https://github.com/go-xorm/xorm)  
**Stars**: 7k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **轻量级**: 体积小，依赖少
- ✅ **API 简洁**: 接口简单易用
- ✅ **多数据库**: 支持多种数据库

#### 适用场景

- 小型项目
- 需要轻量级 ORM
- 简单 CRUD 操作

---

### 原生 SQL vs ORM

| 方式 | 优势 | 劣势 | 适用场景 |
|------|------|------|----------|
| **GORM** | 开发快、易维护 | 性能略低、学习成本 | 大多数项目 ✅ |
| **Ent** | 类型安全、现代化 | 学习曲线陡 | 大型项目 |
| **XORM** | 轻量、简单 | 功能较少 | 小型项目 |
| **原生 SQL** | 性能最高、灵活 | 开发慢、易出错 | 高性能场景 |

### 选择建议

- 🎯 **大多数项目**: 选择 **GORM**（最流行，功能全）
- 🎯 **大型项目**: 考虑 **Ent**（类型安全）
- 🎯 **高性能需求**: 使用原生 SQL + `database/sql` 或 `sqlx`
- 🎯 **简单项目**: 使用 **XORM** 或原生 SQL

---

## 数据库

### 🥇 推荐：MySQL 8.0+（关系型）

**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **企业级**: 成熟稳定，广泛采用
- ✅ **性能优秀**: 8.0+ 版本性能大幅提升
- ✅ **生态丰富**: 工具、驱动、文档完善
- ✅ **社区活跃**: 问题解决快，资源丰富

#### 适用场景

- Web 应用
- 电商平台
- 内容管理系统
- 需要事务支持的应用

#### Go 驱动

```bash
go get gorm.io/driver/mysql
# 或
go get github.com/go-sql-driver/mysql
```

---

### 🥈 推荐：PostgreSQL（关系型）

**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **功能强大**: JSON、数组、全文搜索等高级特性
- ✅ **标准兼容**: SQL 标准支持最好
- ✅ **扩展性**: 支持自定义函数、类型
- ✅ **开源免费**: 完全开源，无商业限制

#### 适用场景

- 复杂查询需求
- 需要 JSON 存储
- 地理空间数据
- 数据分析

#### Go 驱动

```bash
go get gorm.io/driver/postgres
# 或
go get github.com/lib/pq
```

---

### 🥉 推荐：Redis（缓存/NoSQL）

**使用率**: ⭐⭐⭐⭐⭐ (缓存首选)

#### 优势

- ✅ **性能极佳**: 内存存储，速度极快
- ✅ **功能丰富**: 支持多种数据结构
- ✅ **企业级**: 高可用、集群支持
- ✅ **生态完善**: 工具、客户端丰富

#### 适用场景

- 缓存
- 会话存储
- 消息队列
- 实时排行榜
- 分布式锁

#### Go 客户端

```bash
go get github.com/redis/go-redis/v9
# 或
go get github.com/go-redis/redis/v8
```

---

### 数据库选型对比

| 数据库 | 类型 | 性能 | 功能 | 适用场景 | 推荐度 |
|--------|------|------|------|----------|--------|
| **MySQL** | 关系型 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Web 应用、电商 | ⭐⭐⭐⭐⭐ |
| **PostgreSQL** | 关系型 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 复杂查询、数据分析 | ⭐⭐⭐⭐ |
| **Redis** | NoSQL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 缓存、会话 | ⭐⭐⭐⭐⭐ |
| MongoDB | NoSQL | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 文档存储 | ⭐⭐⭐ |
| ClickHouse | OLAP | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 数据分析 | ⭐⭐⭐ |

### 选择建议

- 🎯 **主数据库**: **MySQL**（大多数场景）或 **PostgreSQL**（复杂需求）
- 🎯 **缓存**: **Redis**（必选）
- 🎯 **分析场景**: **ClickHouse** 或 **PostgreSQL**
- 🎯 **文档存储**: **MongoDB**（特殊需求）

---

## 缓存

### 🥇 推荐：Redis（首选）

**GitHub**: [redis/go-redis](https://github.com/redis/go-redis)  
**Stars**: 13k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **性能卓越**: 内存存储，延迟极低
- ✅ **数据结构丰富**: String、Hash、List、Set、Sorted Set
- ✅ **功能强大**: 发布订阅、事务、Lua 脚本
- ✅ **高可用**: 支持主从、哨兵、集群

#### 安装

```bash
go get github.com/redis/go-redis/v9
```

#### 示例代码

```go
package main

import (
    "context"
    "github.com/redis/go-redis/v9"
)

func main() {
    rdb := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "",
        DB:       0,
    })
    
    ctx := context.Background()
    
    // 设置
    rdb.Set(ctx, "key", "value", 0)
    
    // 获取
    val, err := rdb.Get(ctx, "key").Result()
    
    // 设置过期
    rdb.SetEX(ctx, "key", "value", time.Hour)
}
```

---

### 🥈 备选：BigCache（内存缓存）

**GitHub**: [allegro/bigcache](https://github.com/allegro/bigcache)  
**Stars**: 7k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **零 GC 压力**: 设计避免 GC
- ✅ **高性能**: 纯内存操作
- ✅ **简单易用**: API 简洁

#### 适用场景

- 单机应用
- 需要避免 GC 压力
- 临时数据缓存

---

### 🥉 备选：FreeCache（内存缓存）

**GitHub**: [coocood/freecache](https://github.com/coocood/freecache)  
**Stars**: 5k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **零 GC**: 预分配内存，避免 GC
- ✅ **高性能**: 内存操作，速度极快
- ✅ **线程安全**: 支持并发访问

#### 适用场景

- 高频读写场景
- 需要避免 GC
- 单机缓存

---

### 缓存选型对比

| 方案 | 类型 | 性能 | 分布式 | 持久化 | 推荐度 |
|------|------|------|--------|--------|--------|
| **Redis** | 外部服务 | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **BigCache** | 内存库 | ⭐⭐⭐⭐⭐ | ❌ | ❌ | ⭐⭐⭐ |
| **FreeCache** | 内存库 | ⭐⭐⭐⭐⭐ | ❌ | ❌ | ⭐⭐⭐ |
| Memcached | 外部服务 | ⭐⭐⭐⭐ | ✅ | ❌ | ⭐⭐⭐ |

### 选择建议

- 🎯 **大多数项目**: 使用 **Redis**（必选）
- 🎯 **单机高频缓存**: 使用 **BigCache** 或 **FreeCache**
- 🎯 **简单场景**: 使用 **Memcached**

---

## 日志记录

### 🥇 推荐：Zap（Uber 出品，高性能）

**GitHub**: [uber-go/zap](https://github.com/uber-go/zap)  
**Stars**: 21k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **性能极佳**: 零分配、结构化日志
- ✅ **Uber 维护**: 企业级支持
- ✅ **结构化日志**: 支持 JSON、键值对格式
- ✅ **日志级别**: Debug、Info、Warn、Error、DPanic、Panic、Fatal

#### 适用场景

- 高性能应用
- 需要结构化日志
- 企业级项目
- 微服务架构

#### 安装

```bash
go get go.uber.org/zap
```

#### 示例代码

```go
package main

import (
    "go.uber.org/zap"
    "time"
)

func main() {
    // 开发环境：使用 Sugar Logger（更易用）
    logger, _ := zap.NewDevelopment()
    defer logger.Sync()
    
    sugar := logger.Sugar()
    sugar.Infow("failed to fetch URL",
        "url", "http://example.com",
        "attempt", 3,
        "backoff", time.Second,
    )
    
    // 生产环境：使用高性能 Logger
    logger, _ = zap.NewProduction()
    logger.Info("failed to fetch URL",
        zap.String("url", "http://example.com"),
        zap.Int("attempt", 3),
        zap.Duration("backoff", time.Second),
    )
}
```

---

### 🥈 备选：Logrus（结构化日志）

**GitHub**: [sirupsen/logrus](https://github.com/sirupsen/logrus)  
**Stars**: 24k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **API 优雅**: 使用简单，接口友好
- ✅ **功能丰富**: 支持 Hook、Formatter
- ✅ **生态完善**: 插件、中间件丰富
- ✅ **兼容性好**: 兼容标准库 `log` 接口

#### 适用场景

- 需要易用的日志库
- 需要丰富的插件
- 中小型项目

#### 安装

```bash
go get github.com/sirupsen/logrus
```

#### 示例代码

```go
package main

import (
    "github.com/sirupsen/logrus"
)

func main() {
    logrus.SetFormatter(&logrus.JSONFormatter{})
    logrus.SetLevel(logrus.InfoLevel)
    
    logrus.WithFields(logrus.Fields{
        "animal": "walrus",
        "size":   10,
    }).Info("A group of walrus emerges from the ocean")
}
```

---

### 🥉 备选：zerolog（零分配）

**GitHub**: [rs/zerolog](https://github.com/rs/zerolog)  
**Stars**: 9k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **零分配**: 设计避免内存分配
- ✅ **性能优秀**: 接近 Zap
- ✅ **API 简洁**: 链式调用，易用
- ✅ **JSON 优先**: 默认 JSON 格式

#### 适用场景

- 高性能需求
- 需要零分配
- JSON 日志格式

---

### 日志库对比

| 库 | Stars | 性能 | 易用性 | 结构化 | 推荐度 |
|----|-------|------|--------|--------|--------|
| **Zap** | 21k+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| **Logrus** | 24k+ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ |
| **zerolog** | 9k+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ |
| 标准库 log | - | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ | ⭐⭐ |

### 选择建议

- 🎯 **大多数项目**: 选择 **Zap**（性能最佳，企业级）
- 🎯 **易用性优先**: 选择 **Logrus**（API 更友好）
- 🎯 **极致性能**: 选择 **zerolog**（零分配）
- 🎯 **简单项目**: 使用标准库 `log`

---

## 错误处理

### 🥇 推荐：pkg/errors（增强错误）

**GitHub**: [pkg/errors](https://github.com/pkg/errors)  
**Stars**: 6k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **错误堆栈**: 完整的错误堆栈跟踪
- ✅ **错误包装**: 支持错误包装和上下文
- ✅ **兼容标准**: 兼容 `errors` 包
- ✅ **企业采用**: 广泛使用

#### 安装

```bash
go get github.com/pkg/errors
```

#### 示例代码

```go
package main

import (
    "fmt"
    "github.com/pkg/errors"
)

func main() {
    err := doSomething()
    if err != nil {
        // 打印完整堆栈
        fmt.Printf("%+v\n", err)
    }
}

func doSomething() error {
    return errors.Wrap(doSomethingElse(), "failed to do something")
}

func doSomethingElse() error {
    return errors.New("original error")
}
```

---

### 🥈 备选：标准库 errors（Go 1.13+）

**包**: `errors`  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **官方支持**: Go 标准库
- ✅ **错误包装**: 支持 `errors.Wrap`、`errors.Is`、`errors.As`
- ✅ **无需依赖**: 无需第三方库

#### 适用场景

- Go 1.13+ 项目
- 不想引入第三方依赖
- 简单错误处理

#### 示例代码

```go
package main

import (
    "errors"
    "fmt"
)

func main() {
    err := doSomething()
    if errors.Is(err, ErrNotFound) {
        fmt.Println("not found")
    }
}

var ErrNotFound = errors.New("not found")
```

---

### 🥉 备选：go-errors（功能丰富）

**GitHub**: [go-errors/errors](https://github.com/go-errors/errors)  
**Stars**: 3k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **堆栈跟踪**: 自动记录堆栈
- ✅ **错误类型**: 支持错误类型判断
- ✅ **格式化**: 友好的错误格式化

---

### 错误处理最佳实践

#### 1. 错误定义

```go
// 定义错误变量
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
)

// 或使用自定义错误类型
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}
```

#### 2. 错误包装

```go
// 使用 pkg/errors
if err != nil {
    return errors.Wrap(err, "failed to create user")
}

// 使用标准库（Go 1.13+）
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

#### 3. 错误判断

```go
// 使用 errors.Is
if errors.Is(err, ErrNotFound) {
    // 处理未找到错误
}

// 使用 errors.As
var validationErr *ValidationError
if errors.As(err, &validationErr) {
    // 处理验证错误
}
```

### 选择建议

- 🎯 **大多数项目**: 使用 **pkg/errors**（堆栈跟踪）
- 🎯 **Go 1.13+**: 使用标准库 **errors**（无依赖）
- 🎯 **简单项目**: 使用标准库即可

---

## 配置管理

### 🥇 推荐：Viper（功能全面）

**GitHub**: [spf13/viper](https://github.com/spf13/viper)  
**Stars**: 27k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **多格式支持**: JSON、YAML、TOML、环境变量
- ✅ **功能丰富**: 配置热加载、类型转换、默认值
- ✅ **生态完善**: 与 Cobra、Gin 等集成良好
- ✅ **企业采用**: 广泛使用

#### 安装

```bash
go get github.com/spf13/viper
```

#### 示例代码

```go
package main

import (
    "github.com/spf13/viper"
)

func main() {
    viper.SetConfigName("config")
    viper.SetConfigType("yaml")
    viper.AddConfigPath(".")
    
    viper.AutomaticEnv()
    viper.SetEnvPrefix("APP")
    
    if err := viper.ReadInConfig(); err != nil {
        panic(err)
    }
    
    port := viper.GetString("server.port")
    dbHost := viper.GetString("database.host")
}
```

---

### 🥈 备选：环境变量（简单场景）

**包**: `os`  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **简单直接**: 无需第三方库
- ✅ **12-Factor**: 符合 12-Factor App 原则
- ✅ **容器友好**: 适合 Docker、Kubernetes

#### 适用场景

- 简单配置
- 容器化部署
- 微服务架构

#### 示例代码

```go
package main

import (
    "os"
    "strconv"
)

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    
    debug, _ := strconv.ParseBool(os.Getenv("DEBUG"))
}
```

---

### 🥉 备选：env（环境变量解析）

**GitHub**: [caarlos0/env](https://github.com/caarlos0/env)  
**Stars**: 4k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **结构体解析**: 自动解析到结构体
- ✅ **类型转换**: 自动类型转换
- ✅ **简单易用**: API 简洁

#### 示例代码

```go
package main

import (
    "github.com/caarlos0/env/v10"
)

type Config struct {
    Port  int    `env:"PORT" envDefault:"8080"`
    Debug bool   `env:"DEBUG" envDefault:"false"`
}

func main() {
    cfg := Config{}
    if err := env.Parse(&cfg); err != nil {
        panic(err)
    }
}
```

### 选择建议

- 🎯 **大多数项目**: 使用 **Viper**（功能全面）
- 🎯 **简单项目**: 使用环境变量（`os.Getenv`）
- 🎯 **环境变量优先**: 使用 **env** 库

---

## API 文档

### 🥇 推荐：Swagger/OpenAPI（最流行）

**GitHub**: [swaggo/swag](https://github.com/swaggo/swag)  
**Stars**: 10k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 优势

- ✅ **标准规范**: OpenAPI 标准
- ✅ **自动生成**: 从注释生成文档
- ✅ **交互式**: Swagger UI 支持在线测试
- ✅ **生态完善**: 与 Gin、Echo 等集成

#### 安装

```bash
go install github.com/swaggo/swag/cmd/swag@latest
go get -u github.com/swaggo/gin-swagger
go get -u github.com/swaggo/files
```

#### 示例代码

```go
// @title           API 文档
// @version         1.0
// @description     这是一个示例 API 文档
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.example.com/support
// @contact.email  support@example.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description JWT 认证，格式: Bearer <token>

package main

import (
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

// @Summary      获取用户信息
// @Description  根据用户 ID 获取用户信息
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "用户 ID"
// @Success      200  {object}  User
// @Failure      400  {object}  ErrorResponse
// @Router       /users/{id} [get]
func GetUser(c *gin.Context) {
    // ...
}

func main() {
    r := gin.Default()
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.Run()
}
```

---

### 🥈 备选：go-swagger（代码生成）

**GitHub**: [go-swagger/go-swagger](https://github.com/go-swagger/go-swagger)  
**Stars**: 9k+  
**使用率**: ⭐⭐⭐

#### 优势

- ✅ **代码生成**: 从 Swagger 生成代码
- ✅ **类型安全**: 生成类型安全的客户端
- ✅ **服务器生成**: 自动生成服务器代码

#### 适用场景

- 需要代码生成
- 客户端 SDK 生成
- 大型项目

---

### 🥉 备选：api2go（OpenAPI 生成）

**GitHub**: [manyminds/api2go](https://github.com/manyminds/api2go)  
**Stars**: 1k+  
**使用率**: ⭐⭐

---

### 选择建议

- 🎯 **大多数项目**: 使用 **Swaggo**（最流行，易用）
- 🎯 **代码生成**: 使用 **go-swagger**（生成代码）
- 🎯 **简单项目**: 使用手动编写 OpenAPI 规范

---

## 认证授权

### JWT 认证

#### 🥇 推荐：golang-jwt/jwt

**GitHub**: [golang-jwt/jwt](https://github.com/golang-jwt/jwt)  
**Stars**: 6k+  
**使用率**: ⭐⭐⭐⭐⭐ (最高)

#### 安装

```bash
go get github.com/golang-jwt/jwt/v5
```

#### 示例代码

```go
package main

import (
    "github.com/golang-jwt/jwt/v5"
    "time"
)

func GenerateToken(userID uint) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "exp":      time.Now().Add(time.Hour * 24).Unix(),
    }
    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte("secret"))
}

func ValidateToken(tokenString string) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return []byte("secret"), nil
    })
}
```

---

### OAuth 2.0

#### 🥇 推荐：golang/oauth2

**GitHub**: [golang/oauth2](https://github.com/golang/oauth2)  
**Stars**: 7k+  
**使用率**: ⭐⭐⭐⭐⭐

#### 安装

```bash
go get golang.org/x/oauth2
```

---

### 权限控制

#### 🥇 推荐：casbin（RBAC/ABAC）

**GitHub**: [casbin/casbin](https://github.com/casbin/casbin)  
**Stars**: 16k+  
**使用率**: ⭐⭐⭐⭐

#### 优势

- ✅ **多种模型**: RBAC、ABAC、ACL
- ✅ **策略存储**: 支持文件、数据库
- ✅ **语言支持**: 多语言支持

#### 安装

```bash
go get github.com/casbin/casbin/v2
```

---

### 选择建议

- 🎯 **JWT 认证**: 使用 **golang-jwt/jwt**
- 🎯 **OAuth**: 使用 **golang/oauth2**
- 🎯 **权限控制**: 使用 **casbin**

---

## 其他工具

### 参数验证

#### 🥇 推荐：go-playground/validator

**GitHub**: [go-playground/validator](https://github.com/go-playground/validator)  
**Stars**: 15k+  
**使用率**: ⭐⭐⭐⭐⭐

#### 安装

```bash
go get github.com/go-playground/validator/v10
```

---

### HTTP 客户端

#### 🥇 推荐：go-resty/resty

**GitHub**: [go-resty/resty](https://github.com/go-resty/resty)  
**Stars**: 9k+  
**使用率**: ⭐⭐⭐⭐

#### 安装

```bash
go get github.com/go-resty/resty/v2
```

---

### 任务队列

#### 🥇 推荐：hibiken/asynq

**GitHub**: [hibiken/asynq](https://github.com/hibiken/asynq)  
**Stars**: 7k+  
**使用率**: ⭐⭐⭐⭐

#### 安装

```bash
go get github.com/hibiken/asynq
```

---

### 测试框架

#### 🥇 推荐：stretchr/testify

**GitHub**: [stretchr/testify](https://github.com/stretchr/testify)  
**Stars**: 22k+  
**使用率**: ⭐⭐⭐⭐⭐

#### 安装

```bash
go get github.com/stretchr/testify
```

---

### 依赖注入

#### 🥇 推荐：google/wire

**GitHub**: [google/wire](https://github.com/google/wire)  
**Stars**: 11k+  
**使用率**: ⭐⭐⭐⭐

#### 安装

```bash
go get github.com/google/wire/cmd/wire
```

---

## 技术栈组合推荐

### 🎯 方案一：标准企业级（推荐）

**适用场景**: 大多数企业级项目

| 组件 | 技术选型 | 说明 |
|------|----------|------|
| Web 框架 | **Gin** | 最流行，生态最好 |
| ORM | **GORM** | 功能全面，易用 |
| 数据库 | **MySQL 8.0+** | 企业级，稳定 |
| 缓存 | **Redis** | 高性能缓存 |
| 日志 | **Zap** | 高性能，结构化 |
| 错误处理 | **pkg/errors** | 堆栈跟踪 |
| 配置管理 | **Viper** | 功能全面 |
| API 文档 | **Swaggo** | 自动生成 |
| 认证 | **golang-jwt/jwt** | JWT 标准 |
| 参数验证 | **go-playground/validator** | 最流行 |

**特点**:
- ✅ 生态完善，社区支持好
- ✅ 学习成本低，易于上手
- ✅ 适合快速开发
- ✅ 企业广泛采用

---

### 🎯 方案二：高性能方案

**适用场景**: 高并发、高性能需求

| 组件 | 技术选型 | 说明 |
|------|----------|------|
| Web 框架 | **Fiber** | 极致性能 |
| ORM | **Ent** | 类型安全 |
| 数据库 | **PostgreSQL** | 功能强大 |
| 缓存 | **Redis** | 必选 |
| 日志 | **zerolog** | 零分配 |
| 错误处理 | **标准库 errors** | 无依赖 |
| 配置管理 | **环境变量** | 简单直接 |
| API 文档 | **Swaggo** | 自动生成 |
| 认证 | **golang-jwt/jwt** | JWT 标准 |

**特点**:
- ✅ 性能最优
- ✅ 资源占用低
- ✅ 适合高并发场景

---

### 🎯 方案三：轻量级方案

**适用场景**: 小型项目、微服务

| 组件 | 技术选型 | 说明 |
|------|----------|------|
| Web 框架 | **Echo** | 轻量高性能 |
| ORM | **原生 SQL + sqlx** | 性能最高 |
| 数据库 | **MySQL** | 简单稳定 |
| 缓存 | **Redis** | 必选 |
| 日志 | **标准库 log** | 简单直接 |
| 错误处理 | **标准库 errors** | 无依赖 |
| 配置管理 | **环境变量** | 简单直接 |
| API 文档 | **手动编写** | 灵活控制 |

**特点**:
- ✅ 依赖最少
- ✅ 体积小
- ✅ 适合微服务

---

## 总结

### 核心选型原则

1. **优先选择最流行**: 生态好、问题解决快
2. **性能与易用性平衡**: 根据项目需求选择
3. **团队熟悉度**: 考虑团队技术栈
4. **长期维护**: 选择活跃维护的项目
5. **企业采用**: 参考知名企业选型

### 快速参考表

| 类别 | 推荐选型 | GitHub Stars | 使用率 |
|------|----------|--------------|--------|
| **Web 框架** | Gin | 75k+ | ⭐⭐⭐⭐⭐ |
| **ORM** | GORM | 38k+ | ⭐⭐⭐⭐⭐ |
| **数据库** | MySQL | - | ⭐⭐⭐⭐⭐ |
| **缓存** | Redis | - | ⭐⭐⭐⭐⭐ |
| **日志** | Zap | 21k+ | ⭐⭐⭐⭐⭐ |
| **错误处理** | pkg/errors | 6k+ | ⭐⭐⭐⭐⭐ |
| **配置管理** | Viper | 27k+ | ⭐⭐⭐⭐⭐ |
| **API 文档** | Swaggo | 10k+ | ⭐⭐⭐⭐⭐ |
| **认证** | golang-jwt/jwt | 6k+ | ⭐⭐⭐⭐⭐ |

---

## 参考资源

- [Go 官方文档](https://go.dev/doc/)
- [Awesome Go](https://github.com/avelino/awesome-go)
- [Go 项目标准目录结构](https://github.com/golang-standards/project-layout)
- [Go 代码审查注释](https://github.com/golang/go/wiki/CodeReviewComments)

---

**最后更新**: 2024-2025  
**文档维护**: 建议每半年更新一次技术栈选型

