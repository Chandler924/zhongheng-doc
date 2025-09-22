# 中间件开发指南

## 概述

纵横框架提供了强大的中间件系统，允许开发者在请求处理过程中插入自定义逻辑。

## 中间件类型

### 1. 全局中间件
应用于所有路由的中间件。

### 2. 路由中间件
应用于特定路由的中间件。

### 3. 错误处理中间件
专门处理错误的中间件。

## 内置中间件

### 日志中间件
```typescript
import { LoggerMiddleware } from '@zongheng/middleware';

app.use(new LoggerMiddleware({
  level: 'info',
  format: 'combined'
}));
```

### 认证中间件
```typescript
import { AuthMiddleware } from '@zongheng/middleware';

app.use('/api/protected', new AuthMiddleware({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
}));
```

### CORS中间件
```typescript
import { CorsMiddleware } from '@zongheng/middleware';

app.use(new CorsMiddleware({
  origin: ['http://localhost:3000'],
  credentials: true
}));
```

### 限流中间件
```typescript
import { RateLimitMiddleware } from '@zongheng/middleware';

app.use(new RateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100个请求
}));
```

## 自定义中间件

### 基础中间件结构
```typescript
import { Middleware, Request, Response, NextFunction } from '@zongheng/framework';

export class CustomMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    // 请求处理前的逻辑
    console.log('请求开始:', req.method, req.url);
    
    // 调用下一个中间件
    await next();
    
    // 请求处理后的逻辑
    console.log('请求结束:', res.statusCode);
  }
}
```

### 异步中间件
```typescript
export class AsyncMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // 异步操作
      const data = await this.fetchExternalData();
      req.externalData = data;
      
      await next();
    } catch (error) {
      res.status(500).json({ error: '外部数据获取失败' });
    }
  }
  
  private async fetchExternalData(): Promise<any> {
    // 模拟异步操作
    return new Promise(resolve => {
      setTimeout(() => resolve({ data: 'external' }), 1000);
    });
  }
}
```

### 条件中间件
```typescript
export class ConditionalMiddleware implements Middleware {
  constructor(private condition: (req: Request) => boolean) {}
  
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (this.condition(req)) {
      // 满足条件时执行
      req.conditionMet = true;
    }
    
    await next();
  }
}

// 使用示例
app.use(new ConditionalMiddleware(req => req.path.startsWith('/api')));
```

## 中间件组合

### 使用多个中间件
```typescript
import { MiddlewareStack } from '@zongheng/framework';

const middlewareStack = new MiddlewareStack([
  new LoggerMiddleware(),
  new CorsMiddleware(),
  new AuthMiddleware(),
  new RateLimitMiddleware()
]);

app.use(middlewareStack);
```

### 条件组合
```typescript
const apiMiddleware = new MiddlewareStack([
  new AuthMiddleware(),
  new RateLimitMiddleware()
]);

const publicMiddleware = new MiddlewareStack([
  new LoggerMiddleware()
]);

app.use('/api', apiMiddleware);
app.use('/public', publicMiddleware);
```

## 错误处理中间件

### 全局错误处理
```typescript
export class ErrorHandlerMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await next();
    } catch (error) {
      console.error('请求处理错误:', error);
      
      if (error instanceof ValidationError) {
        res.status(400).json({
          error: '参数验证失败',
          details: error.details
        });
      } else if (error instanceof AuthError) {
        res.status(401).json({
          error: '认证失败',
          message: error.message
        });
      } else {
        res.status(500).json({
          error: '服务器内部错误'
        });
      }
    }
  }
}
```

### 特定错误处理
```typescript
export class DatabaseErrorMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await next();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({
          error: '数据已存在',
          message: '该记录已存在，请检查输入数据'
        });
      } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        res.status(400).json({
          error: '外键约束失败',
          message: '引用的数据不存在'
        });
      } else {
        throw error; // 重新抛出未处理的错误
      }
    }
  }
}
```

## 中间件配置

### 环境相关配置
```typescript
const middlewareConfig = {
  development: [
    new LoggerMiddleware({ level: 'debug' }),
    new CorsMiddleware({ origin: '*' })
  ],
  production: [
    new LoggerMiddleware({ level: 'info' }),
    new CorsMiddleware({ origin: ['https://myapp.com'] }),
    new RateLimitMiddleware({ max: 1000 })
  ]
};

const middlewares = middlewareConfig[process.env.NODE_ENV] || middlewareConfig.development;
app.use(middlewares);
```

### 动态配置
```typescript
export class ConfigurableMiddleware implements Middleware {
  constructor(private config: any) {}
  
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    // 根据配置执行不同逻辑
    if (this.config.enabled) {
      // 执行中间件逻辑
    }
    
    await next();
  }
  
  updateConfig(newConfig: any): void {
    this.config = { ...this.config, ...newConfig };
  }
}
```

## 性能优化

### 中间件缓存
```typescript
export class CachedMiddleware implements Middleware {
  private cache = new Map();
  
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cacheKey = this.generateCacheKey(req);
    
    if (this.cache.has(cacheKey)) {
      req.cachedData = this.cache.get(cacheKey);
    } else {
      // 执行计算逻辑
      const data = await this.computeData(req);
      this.cache.set(cacheKey, data);
      req.cachedData = data;
    }
    
    await next();
  }
  
  private generateCacheKey(req: Request): string {
    return `${req.method}:${req.path}:${JSON.stringify(req.query)}`;
  }
}
```

## 最佳实践

1. **中间件顺序** - 注意中间件的执行顺序
2. **错误处理** - 始终包含适当的错误处理
3. **性能考虑** - 避免在中间件中执行耗时操作
4. **可重用性** - 设计可重用的中间件
5. **配置化** - 使用配置文件管理中间件参数
6. **测试** - 为中间件编写单元测试

## 调试技巧

### 中间件调试
```typescript
export class DebugMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const start = Date.now();
    console.log(`[${req.method}] ${req.path} - 开始处理`);
    
    await next();
    
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.path} - 处理完成 (${duration}ms)`);
  }
}
```

### 中间件链追踪
```typescript
export class TraceMiddleware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const traceId = this.generateTraceId();
    req.traceId = traceId;
    
    console.log(`[${traceId}] 中间件开始: ${this.constructor.name}`);
    
    try {
      await next();
      console.log(`[${traceId}] 中间件完成: ${this.constructor.name}`);
    } catch (error) {
      console.log(`[${traceId}] 中间件错误: ${this.constructor.name}`, error);
      throw error;
    }
  }
  
  private generateTraceId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```
