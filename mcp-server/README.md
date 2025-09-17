# 纵横框架MCP服务器

这是一个Model Context Protocol (MCP)服务器，允许AI编程工具读取纵横框架的文档内容。

## 功能特性

- 🔍 **智能搜索**：在文档中搜索相关内容，支持模糊匹配
- 📄 **内容获取**：获取指定文档的完整内容
- 📋 **文档列表**：列出所有可用的文档
- 🌳 **结构浏览**：获取文档的目录结构
- 🏷️ **分类过滤**：按前端、后端或全部文档进行过滤

## 安装和运行

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产模式

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 可用工具

### 1. search_docs - 搜索文档

在纵横框架文档中搜索相关内容。

**参数：**
- `query` (string, 必需): 搜索查询字符串
- `category` (string, 可选): 搜索类别 ("frontend", "backend", "all")
- `limit` (number, 可选): 返回结果的最大数量，默认10

**示例：**
```json
{
  "name": "search_docs",
  "arguments": {
    "query": "Vue组件",
    "category": "frontend",
    "limit": 5
  }
}
```

### 2. get_doc_content - 获取文档内容

获取指定文档的完整内容。

**参数：**
- `path` (string, 必需): 文档路径，例如 "/frontend/getting-started"

**示例：**
```json
{
  "name": "get_doc_content",
  "arguments": {
    "path": "/frontend/getting-started"
  }
}
```

### 3. list_docs - 列出文档

列出所有可用的文档。

**参数：**
- `category` (string, 可选): 文档类别 ("frontend", "backend", "all")

**示例：**
```json
{
  "name": "list_docs",
  "arguments": {
    "category": "frontend"
  }
}
```

### 4. get_doc_structure - 获取文档结构

获取文档的目录结构。

**参数：** 无

**示例：**
```json
{
  "name": "get_doc_structure",
  "arguments": {}
}
```

## 配置AI工具

### Claude Desktop

在Claude Desktop的配置文件中添加：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "node",
      "args": ["/path/to/zongheng-mcp/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Cursor

在Cursor的设置中配置MCP服务器：

1. 打开设置
2. 找到MCP配置
3. 添加服务器配置

### 其他AI工具

大多数支持MCP的AI工具都可以通过类似的方式配置此服务器。

## 响应格式

### 搜索响应

```json
{
  "query": "Vue组件",
  "category": "frontend",
  "results": [
    {
      "title": "组件库",
      "path": "/frontend/components",
      "excerpt": "纵横前端框架提供了丰富的UI组件...",
      "score": 0.2,
      "category": "frontend"
    }
  ],
  "total": 1
}
```

### 文档内容响应

```json
{
  "path": "/frontend/getting-started",
  "title": "前端框架快速开始",
  "content": "# 前端框架快速开始\n\n欢迎使用纵横前端框架...",
  "frontmatter": {},
  "lastModified": "2024-01-01T00:00:00.000Z"
}
```

### 文档列表响应

```json
{
  "category": "frontend",
  "documents": [
    {
      "path": "/frontend/getting-started",
      "title": "前端框架快速开始",
      "category": "frontend",
      "lastModified": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

## 开发

### 项目结构

```
mcp-server/
├── src/
│   ├── index.ts              # 服务器入口
│   └── services/
│       ├── DocumentService.ts # 文档服务
│       └── SearchService.ts   # 搜索服务
├── package.json
├── tsconfig.json
└── README.md
```

### 添加新功能

1. 在`src/services/`中创建新服务
2. 在`src/index.ts`中注册新工具
3. 更新此README文档

### 测试

```bash
# 运行TypeScript编译检查
npm run build

# 手动测试MCP工具
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js
```

## 故障排除

### 常见问题

1. **文档路径错误**
   - 确保文档路径以`/`开头
   - 检查文档文件是否存在

2. **搜索无结果**
   - 尝试使用更简单的搜索词
   - 检查搜索类别设置

3. **服务器启动失败**
   - 检查Node.js版本（需要18+）
   - 确保所有依赖已安装

### 调试

启用详细日志：

```bash
DEBUG=* npm run dev
```

## 许可证

MIT License - 查看 [LICENSE](../LICENSE) 文件了解详情。
