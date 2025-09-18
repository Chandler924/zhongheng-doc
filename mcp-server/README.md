# 纵横框架MCP文档服务器

为AI编程工具（如Cursor、Claude Desktop）提供纵横框架文档访问能力的MCP服务器。

## 功能特性

- 🔍 **文档搜索**：在纵横框架文档中搜索相关内容
- 📖 **内容获取**：获取指定文档的完整内容
- 📋 **文档列表**：列出所有可用的文档
- 🏗️ **结构查看**：查看文档的目录结构
- 🌐 **远程访问**：直接从GitHub Pages获取最新文档内容

## 快速开始

### 安装使用

#### 方式1：使用npx（推荐）

在Cursor或Claude Desktop的MCP配置中添加：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "npx",
      "args": ["-y", "@zongheng/mcp-docs@latest"]
    }
  }
}
```

#### 方式2：本地安装

```bash
npm install -g @zongheng/mcp-docs
```

然后配置：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "zongheng-mcp"
    }
  }
}
```

### 配置说明

- **command**: `npx` 或 `zongheng-mcp`
- **args**: `["-y", "@zongheng/mcp-docs@latest"]` (仅npx方式需要)
- **-y**: 自动确认安装，不询问用户
- **@latest**: 使用最新版本

## 可用工具

### 1. search_docs
在纵横框架文档中搜索相关内容

**参数：**
- `query` (必需): 搜索查询字符串
- `category` (可选): 搜索类别 (frontend, backend, all)
- `limit` (可选): 返回结果的最大数量，默认10

**示例：**
```json
{
  "name": "search_docs",
  "arguments": {
    "query": "状态管理",
    "category": "frontend",
    "limit": 5
  }
}
```

### 2. get_doc_content
获取指定文档的完整内容

**参数：**
- `path` (必需): 文档路径，例如: /frontend/getting-started

**示例：**
```json
{
  "name": "get_doc_content",
  "arguments": {
    "path": "/frontend/state-management"
  }
}
```

### 3. list_docs
列出所有可用的文档

**参数：**
- `category` (可选): 文档类别 (frontend, backend, all)

**示例：**
```json
{
  "name": "list_docs",
  "arguments": {
    "category": "frontend"
  }
}
```

### 4. get_doc_structure
获取文档的目录结构

**参数：** 无

**示例：**
```json
{
  "name": "get_doc_structure",
  "arguments": {}
}
```

## 文档内容

纵横框架文档包含以下内容：

### 前端框架
- 快速开始
- 组件库
- 状态管理
- 路由配置

### 后端框架
- 快速开始
- API设计
- 数据库
- 中间件

### 其他
- 部署指南

## 技术特性

- **远程获取**：直接从GitHub Pages获取文档内容
- **缓存机制**：5分钟缓存，提高性能
- **错误处理**：网络错误时提供友好提示
- **类型安全**：完整的TypeScript支持

## 系统要求

- Node.js >= 18.0.0
- 网络连接（用于获取文档内容）

## 故障排除

### 常见问题

1. **MCP服务器无法启动**
   - 检查Node.js版本是否 >= 18.0.0
   - 确保网络连接正常

2. **文档获取失败**
   - 检查GitHub Pages是否可访问
   - 尝试重新启动MCP服务器

3. **搜索无结果**
   - 尝试使用更简单的搜索词
   - 检查category参数是否正确

### 调试模式

设置环境变量启用调试：

```bash
DEBUG=zongheng-mcp npx @zongheng/mcp-docs@latest
```

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Chandler924/zhongheng-doc.git
cd zongheng-doc/mcp-server

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

### 发布

```bash
# 更新版本
npm version patch

# 发布到npm
npm publish
```

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 相关链接

- [纵横框架文档](https://chandler924.github.io/zhongheng-doc/)
- [GitHub仓库](https://github.com/Chandler924/zhongheng-doc)
- [MCP协议文档](https://modelcontextprotocol.io/)