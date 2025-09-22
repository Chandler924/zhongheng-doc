# 数据库操作指南

## 概述

纵横框架提供了完整的数据库操作解决方案，支持多种数据库类型和ORM操作。

## 支持的数据库

- MySQL
- PostgreSQL
- SQLite
- MongoDB

## 快速开始

### 1. 安装依赖

```bash
npm install @zongheng/database
```

### 2. 配置数据库连接

```typescript
import { DatabaseManager } from '@zongheng/database';

const db = new DatabaseManager({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'myapp'
});
```

### 3. 基本操作

```typescript
// 查询数据
const users = await db.query('SELECT * FROM users WHERE age > ?', [18]);

// 插入数据
const result = await db.insert('users', {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
});

// 更新数据
await db.update('users', { age: 26 }, { id: 1 });

// 删除数据
await db.delete('users', { id: 1 });
```

## ORM 操作

### 定义模型

```typescript
import { Model, Field } from '@zongheng/database';

class User extends Model {
  @Field({ primary: true, autoIncrement: true })
  id: number;

  @Field({ type: 'varchar', length: 100 })
  name: string;

  @Field({ type: 'int' })
  age: number;

  @Field({ type: 'varchar', length: 255 })
  email: string;
}
```

### 模型操作

```typescript
// 创建用户
const user = new User();
user.name = '李四';
user.age = 30;
user.email = 'lisi@example.com';
await user.save();

// 查询用户
const users = await User.find({ age: { $gt: 18 } });

// 更新用户
const user = await User.findById(1);
user.age = 31;
await user.save();

// 删除用户
await User.delete({ id: 1 });
```

## 事务处理

```typescript
await db.transaction(async (trx) => {
  await trx.insert('users', { name: '王五', age: 28 });
  await trx.insert('profiles', { user_id: 1, bio: '开发者' });
});
```

## 连接池管理

```typescript
const db = new DatabaseManager({
  // ... 其他配置
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200
  }
});
```

## 最佳实践

1. **使用连接池** - 提高数据库连接效率
2. **参数化查询** - 防止SQL注入攻击
3. **事务处理** - 确保数据一致性
4. **错误处理** - 妥善处理数据库异常
5. **性能优化** - 合理使用索引和查询优化

## 常见问题

### Q: 如何处理数据库连接失败？
A: 框架会自动重试连接，并记录详细的错误日志。

### Q: 支持读写分离吗？
A: 是的，框架支持主从数据库配置。

### Q: 如何监控数据库性能？
A: 框架内置了性能监控功能，可以查看查询耗时和连接状态。
