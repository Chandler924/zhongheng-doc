# 后端框架快速开始

欢迎使用纵横后端框架！本指南将帮助你在5分钟内搭建你的第一个API服务。

## 安装

### 使用 npm
```bash
npm install @zongheng/backend
```

### 使用 yarn
```bash
yarn add @zongheng/backend
```

### 使用 pnpm
```bash
pnpm add @zongheng/backend
```

## 创建应用

### 1. 初始化项目

```bash
npx create-zongheng-server my-api
cd my-api
```

### 2. 启动开发服务器

```bash
npm run dev
```

API服务将在 `http://localhost:3000` 启动。

## 基本使用

### 创建应用实例

```typescript
// app.ts
import { createApp } from '@zongheng/backend'

const app = createApp({
  port: 3000,
  cors: true,
  bodyParser: true
})

export default app
```

### 定义路由

```typescript
// routes/user.ts
import { Router } from '@zongheng/backend'
import { UserController } from '../controllers/UserController'

const router = new Router()

// GET /api/users
router.get('/', UserController.getAll)

// GET /api/users/:id
router.get('/:id', UserController.getById)

// POST /api/users
router.post('/', UserController.create)

// PUT /api/users/:id
router.put('/:id', UserController.update)

// DELETE /api/users/:id
router.delete('/:id', UserController.delete)

export default router
```

### 创建控制器

```typescript
// controllers/UserController.ts
import { Request, Response } from '@zongheng/backend'
import { UserService } from '../services/UserService'

export class UserController {
  // 获取所有用户
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll()
      res.json({
        success: true,
        data: users
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

  // 根据ID获取用户
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await UserService.getById(id)
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        })
      }

      res.json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

  // 创建用户
  static async create(req: Request, res: Response) {
    try {
      const userData = req.body
      const user = await UserService.create(userData)
      
      res.status(201).json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  // 更新用户
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userData = req.body
      const user = await UserService.update(id, userData)
      
      res.json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  // 删除用户
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await UserService.delete(id)
      
      res.json({
        success: true,
        message: '用户删除成功'
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}
```

### 创建服务层

```typescript
// services/UserService.ts
import { UserModel } from '../models/UserModel'

export class UserService {
  // 获取所有用户
  static async getAll() {
    return await UserModel.findAll()
  }

  // 根据ID获取用户
  static async getById(id: string) {
    return await UserModel.findById(id)
  }

  // 创建用户
  static async create(userData: any) {
    // 数据验证
    if (!userData.name || !userData.email) {
      throw new Error('姓名和邮箱是必填项')
    }

    // 检查邮箱是否已存在
    const existingUser = await UserModel.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('邮箱已存在')
    }

    return await UserModel.create(userData)
  }

  // 更新用户
  static async update(id: string, userData: any) {
    const user = await UserModel.findById(id)
    if (!user) {
      throw new Error('用户不存在')
    }

    return await UserModel.update(id, userData)
  }

  // 删除用户
  static async delete(id: string) {
    const user = await UserModel.findById(id)
    if (!user) {
      throw new Error('用户不存在')
    }

    return await UserModel.delete(id)
  }
}
```

### 创建数据模型

```typescript
// models/UserModel.ts
import { Model, DataTypes } from '@zongheng/backend/database'

export class UserModel extends Model {
  static tableName = 'users'

  static attributes = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }

  // 根据邮箱查找用户
  static async findByEmail(email: string) {
    return await this.findOne({ where: { email } })
  }
}
```

### 注册路由

```typescript
// app.ts
import { createApp } from '@zongheng/backend'
import userRoutes from './routes/user'

const app = createApp({
  port: 3000,
  cors: true,
  bodyParser: true
})

// 注册路由
app.use('/api/users', userRoutes)

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
```

## 项目结构

```
my-api/
├── src/
│   ├── controllers/    # 控制器
│   ├── services/      # 服务层
│   ├── models/        # 数据模型
│   ├── routes/        # 路由定义
│   ├── middleware/    # 中间件
│   ├── utils/         # 工具函数
│   ├── config/        # 配置文件
│   └── app.ts         # 应用入口
├── tests/             # 测试文件
├── docs/              # API文档
└── package.json
```

## 环境配置

### .env 文件

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=password

# JWT配置
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Redis配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### 配置文件

```typescript
// config/database.ts
export const databaseConfig = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'myapp_dev',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    dialect: 'postgres'
  },
  production: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    logging: false
  }
}
```

## 中间件

### 认证中间件

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from '@zongheng/backend'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '未提供认证令牌'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '无效的认证令牌'
    })
  }
}
```

### 错误处理中间件

```typescript
// middleware/errorHandler.ts
import { Request, Response, NextFunction } from '@zongheng/backend'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error)

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? '服务器内部错误' 
      : error.message
  })
}
```

## 下一步

- 查看 [API设计指南](/backend/api-design) 了解RESTful API最佳实践
- 学习 [数据库操作](/backend/database) 进行数据持久化
- 配置 [中间件](/backend/middleware) 实现认证、日志等功能

## 常见问题

### Q: 如何连接数据库？
A: 在 `.env` 文件中配置数据库连接信息，框架会自动建立连接。

### Q: 如何实现用户认证？
A: 使用JWT中间件进行用户认证，具体实现请参考认证中间件示例。

### Q: 如何部署到生产环境？
A: 设置 `NODE_ENV=production` 并配置相应的环境变量即可。
