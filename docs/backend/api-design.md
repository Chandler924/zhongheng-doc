# API设计指南

本指南将帮助你设计RESTful API，遵循最佳实践和行业标准。

## RESTful API原则

### 1. 资源导向

API应该围绕资源设计，而不是操作：

```typescript
// ✅ 好的设计
GET    /api/users          // 获取用户列表
GET    /api/users/123      // 获取特定用户
POST   /api/users          // 创建新用户
PUT    /api/users/123      // 更新用户
DELETE /api/users/123      // 删除用户

// ❌ 避免的设计
GET    /api/getUsers
POST   /api/createUser
POST   /api/updateUser
POST   /api/deleteUser
```

### 2. HTTP方法语义

```typescript
// GET - 获取资源
GET /api/users
GET /api/users/123
GET /api/users/123/posts

// POST - 创建资源
POST /api/users
POST /api/users/123/posts

// PUT - 完整更新资源
PUT /api/users/123

// PATCH - 部分更新资源
PATCH /api/users/123

// DELETE - 删除资源
DELETE /api/users/123
```

### 3. 状态码使用

```typescript
// 成功响应
200 OK          // 请求成功
201 Created     // 资源创建成功
204 No Content  // 删除成功，无返回内容

// 客户端错误
400 Bad Request     // 请求参数错误
401 Unauthorized    // 未认证
403 Forbidden       // 无权限
404 Not Found       // 资源不存在
409 Conflict        // 资源冲突
422 Unprocessable Entity // 数据验证失败

// 服务器错误
500 Internal Server Error // 服务器内部错误
502 Bad Gateway          // 网关错误
503 Service Unavailable  // 服务不可用
```

## 请求和响应格式

### 统一响应格式

```typescript
// 成功响应
{
  "success": true,
  "data": {
    "id": 123,
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "message": "操作成功"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "用户不存在",
    "details": {
      "userId": 123
    }
  }
}

// 分页响应
{
  "success": true,
  "data": [
    { "id": 1, "name": "用户1" },
    { "id": 2, "name": "用户2" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### 请求参数

```typescript
// 查询参数
GET /api/users?page=1&pageSize=20&sort=name&order=asc

// 路径参数
GET /api/users/123

// 请求体
POST /api/users
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "age": 25
}
```

## 实现示例

### 用户API控制器

```typescript
// controllers/UserController.ts
import { Request, Response } from '@zongheng/backend'
import { UserService } from '../services/UserService'
import { validateUser } from '../validators/userValidator'

export class UserController {
  // 获取用户列表
  static async getUsers(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = 20, search, sort, order } = req.query
      
      const result = await UserService.getUsers({
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
        search: search as string,
        sort: sort as string,
        order: order as 'asc' | 'desc'
      })

      res.json({
        success: true,
        data: result.users,
        pagination: result.pagination
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取用户列表失败'
        }
      })
    }
  }

  // 获取单个用户
  static async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await UserService.getUserById(id)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: '用户不存在'
          }
        })
      }

      res.json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取用户失败'
        }
      })
    }
  }

  // 创建用户
  static async createUser(req: Request, res: Response) {
    try {
      // 验证请求数据
      const validation = validateUser(req.body)
      if (!validation.isValid) {
        return res.status(422).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '数据验证失败',
            details: validation.errors
          }
        })
      }

      const user = await UserService.createUser(req.body)
      
      res.status(201).json({
        success: true,
        data: user,
        message: '用户创建成功'
      })
    } catch (error) {
      if (error.code === 'DUPLICATE_EMAIL') {
        return res.status(409).json({
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: '邮箱已存在'
          }
        })
      }

      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '创建用户失败'
        }
      })
    }
  }

  // 更新用户
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      
      // 验证请求数据
      const validation = validateUser(req.body, { partial: true })
      if (!validation.isValid) {
        return res.status(422).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '数据验证失败',
            details: validation.errors
          }
        })
      }

      const user = await UserService.updateUser(id, req.body)
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: '用户不存在'
          }
        })
      }

      res.json({
        success: true,
        data: user,
        message: '用户更新成功'
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '更新用户失败'
        }
      })
    }
  }

  // 删除用户
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const deleted = await UserService.deleteUser(id)

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: '用户不存在'
          }
        })
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '删除用户失败'
        }
      })
    }
  }
}
```

### 数据验证

```typescript
// validators/userValidator.ts
import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(150),
  phone: Joi.string().pattern(/^1[3-9]\d{9}$/),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    country: Joi.string()
  })
})

export function validateUser(data: any, options: { partial?: boolean } = {}) {
  const schema = options.partial ? userSchema.fork(Object.keys(userSchema.describe().keys), (schema) => schema.optional()) : userSchema
  
  const { error, value } = schema.validate(data, { abortEarly: false })
  
  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    }
  }

  return {
    isValid: true,
    data: value
  }
}
```

### 服务层实现

```typescript
// services/UserService.ts
import { UserModel } from '../models/UserModel'
import { AppError } from '../utils/AppError'

export class UserService {
  static async getUsers(options: {
    page: number
    pageSize: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
  }) {
    const { page, pageSize, search, sort = 'createdAt', order = 'desc' } = options
    
    const query: any = {}
    
    // 搜索条件
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    // 计算分页
    const skip = (page - 1) * pageSize
    
    // 执行查询
    const [users, total] = await Promise.all([
      UserModel.find(query)
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(pageSize)
        .select('-password'), // 排除密码字段
      UserModel.countDocuments(query)
    ])

    return {
      users,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    }
  }

  static async getUserById(id: string) {
    const user = await UserModel.findById(id).select('-password')
    return user
  }

  static async createUser(userData: any) {
    // 检查邮箱是否已存在
    const existingUser = await UserModel.findOne({ email: userData.email })
    if (existingUser) {
      throw new AppError('DUPLICATE_EMAIL', '邮箱已存在', 409)
    }

    const user = new UserModel(userData)
    await user.save()
    
    return user.toObject({ transform: (doc, ret) => {
      delete ret.password
      return ret
    }})
  }

  static async updateUser(id: string, updateData: any) {
    const user = await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')

    return user
  }

  static async deleteUser(id: string) {
    const result = await UserModel.findByIdAndDelete(id)
    return !!result
  }
}
```

## 中间件

### 认证中间件

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from '@zongheng/backend'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: '未提供认证令牌'
        }
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    req.user = decoded
    
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: '无效的认证令牌'
      }
    })
  }
}
```

### 权限中间件

```typescript
// middleware/permission.ts
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '未认证'
        }
      })
    }

    if (!req.user.permissions?.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: '权限不足'
        }
      })
    }

    next()
  }
}
```

### 错误处理中间件

```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('API Error:', error)

  // 自定义错误
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    })
  }

  // 数据库验证错误
  if (error.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '数据验证失败',
        details: Object.values(error.errors).map((err: any) => ({
          field: err.path,
          message: err.message
        }))
      }
    })
  }

  // 默认错误
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? '服务器内部错误' 
        : error.message
    }
  })
}
```

## API文档

### OpenAPI/Swagger集成

```typescript
// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '纵横框架API',
      version: '1.0.0',
      description: '纵横框架的RESTful API文档'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: '开发服务器'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.ts', './controllers/*.ts']
}

const specs = swaggerJsdoc(options)

// 在app.ts中使用
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
```

### API注释示例

```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 获取用户列表
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 页码
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 每页数量
 *     responses:
 *       200:
 *         description: 成功获取用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
```

## 性能优化

### 1. 缓存策略

```typescript
// middleware/cache.ts
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 600 }) // 10分钟缓存

export const cacheMiddleware = (ttl: number = 600) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl
    
    const cached = cache.get(key)
    if (cached) {
      return res.json(cached)
    }

    // 重写res.json以缓存响应
    const originalJson = res.json
    res.json = function(body) {
      cache.set(key, body, ttl)
      return originalJson.call(this, body)
    }

    next()
  }
}
```

### 2. 请求限流

```typescript
// middleware/rateLimit.ts
import rateLimit from 'express-rate-limit'

export const createRateLimit = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: '请求过于频繁，请稍后再试'
      }
    }
  })
}

// 使用示例
app.use('/api/auth', createRateLimit(15 * 60 * 1000, 5)) // 15分钟内最多5次请求
```

### 3. 数据分页

```typescript
// utils/pagination.ts
export interface PaginationOptions {
  page: number
  pageSize: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function createPaginationResult<T>(
  data: T[],
  total: number,
  options: PaginationOptions
): PaginationResult<T> {
  const { page, pageSize } = options
  const totalPages = Math.ceil(total / pageSize)

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  }
}
```

## 测试

### API测试

```typescript
// tests/api/users.test.ts
import request from 'supertest'
import { app } from '../../app'

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should return user list', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.pagination).toBeDefined()
    })

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/users?page=2&pageSize=10')
        .expect(200)

      expect(response.body.pagination.page).toBe(2)
      expect(response.body.pagination.pageSize).toBe(10)
    })
  })

  describe('POST /api/users', () => {
    it('should create user with valid data', async () => {
      const userData = {
        name: '测试用户',
        email: 'test@example.com',
        age: 25
      }

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe(userData.name)
    })

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        name: '', // 空名称
        email: 'invalid-email' // 无效邮箱
      }

      const response = await request(app)
        .post('/api/users')
        .send(invalidData)
        .expect(422)

      expect(response.body.success).toBe(false)
      expect(response.body.error.code).toBe('VALIDATION_ERROR')
    })
  })
})
```

## 最佳实践总结

1. **RESTful设计**：遵循REST原则，使用正确的HTTP方法和状态码
2. **统一响应格式**：使用一致的响应结构
3. **数据验证**：在服务端验证所有输入数据
4. **错误处理**：提供清晰的错误信息和错误码
5. **安全性**：实现认证、授权和输入验证
6. **性能优化**：使用缓存、分页和请求限流
7. **文档化**：提供完整的API文档
8. **测试**：编写全面的API测试
9. **版本控制**：为API版本变更制定策略
10. **监控**：记录API使用情况和性能指标
