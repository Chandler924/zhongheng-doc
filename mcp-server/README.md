# 纵横框架MCP文档服务器

为AI编程工具（如Cursor、Claude Desktop）提供远程文档访问能力的MCP服务器，支持自定义站点URL。

## 功能特性

- 🔍 **文档搜索**：在指定文档站点中搜索相关内容
- 📖 **内容获取**：获取指定文档的完整内容
- 📋 **文档列表**：列出所有可用的文档
- 🏗️ **结构查看**：查看文档的目录结构
- 🌐 **远程访问**：从任意HTTP/HTTPS站点获取文档内容
- ⚙️ **自定义站点**：支持通过参数指定文档站点URL
- 💾 **智能缓存**：5分钟缓存机制，提高性能

## 快速开始

### 安装使用

#### 方式1：使用默认站点（推荐）

在Cursor或Claude Desktop的MCP配置中添加：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "npx",
      "args": ["-y", "zongheng-mcp-docs@latest"]
    }
  }
}
```

#### 方式2：自定义站点URL

```json
{
  "mcpServers": {
    "custom-docs": {
      "command": "npx",
      "args": ["-y", "zongheng-mcp-docs@latest", "--url=https://your-docs-site.com"]
    }
  }
}
```

#### 方式3：本地安装

```bash
npm install -g zongheng-mcp-docs
```

然后配置：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "zongheng-mcp",
      "args": ["--url=https://your-docs-site.com"]
    }
  }
}
```

### 配置说明

- **command**: `npx` 或 `zongheng-mcp`
- **args**: 
  - `["-y", "zongheng-mcp-docs@latest"]` (npx方式)
  - `["--url=https://your-site.com"]` (自定义站点)
- **--url**: 指定文档站点URL（可选，默认为纵横框架文档站点）
- **-y**: 自动确认安装，不询问用户

## 可用工具

### 1. search_docs
在文档站点中搜索相关内容

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

### 5. get_site_info
获取当前配置的站点信息

**参数：** 无

**示例：**
```json
{
  "name": "get_site_info",
  "arguments": {}
}
```

## 自定义站点配置

### 支持的站点类型

- **VuePress站点**：如纵横框架文档
- **静态HTML站点**：任何HTTP/HTTPS可访问的文档站点
- **GitHub Pages**：自动支持
- **其他文档站点**：只要符合基本HTML结构

### 配置示例

#### 使用不同的文档站点

```json
{
  "mcpServers": {
    "vue-docs": {
      "command": "npx",
      "args": ["-y", "zongheng-mcp-docs@latest", "--url=https://vuejs.org"]
    },
    "react-docs": {
      "command": "npx",
      "args": ["-y", "zongheng-mcp-docs@latest", "--url=https://react.dev"]
    },
    "custom-docs": {
      "command": "npx",
      "args": ["-y", "zongheng-mcp-docs@latest", "--url=https://your-company.com/docs"]
    }
  }
}
```

## 技术特性

- **远程获取**：从指定站点获取文档内容
- **缓存机制**：5分钟缓存，提高性能
- **错误处理**：网络错误时提供友好提示
- **参数支持**：支持命令行参数自定义站点URL
- **轻量级**：只依赖MCP SDK，无其他重型依赖

## 系统要求

- Node.js >= 18.0.0
- 网络连接（用于获取文档内容）

## 故障排除

### 常见问题

1. **MCP服务器无法启动**
   - 检查Node.js版本是否 >= 18.0.0
   - 确保网络连接正常

2. **文档获取失败**
   - 检查站点URL是否正确
   - 确保站点可访问
   - 检查站点是否返回HTML内容

3. **搜索无结果**
   - 尝试使用更简单的搜索词
   - 检查category参数是否正确

### 调试模式

设置环境变量启用调试：

```bash
DEBUG=zongheng-mcp npx zongheng-mcp-docs@latest --url=https://your-site.com
```

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Chandler924/zhongheng-doc.git
cd zongheng-doc/mcp-server

# 安装依赖
npm install

# 测试运行
npm start

# 测试自定义站点
npm test
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

- [纵横框架文档](https://moli2.zt.com.cn/zongheng-doc/)
- [GitHub仓库](https://github.com/Chandler924/zhongheng-doc)
- [MCP协议文档](https://modelcontextprotocol.io/)