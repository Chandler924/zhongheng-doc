# 使用指南

本指南将帮助你快速上手纵横框架文档站点和MCP服务。

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/zongheng-mcp.git
cd zongheng-mcp
```

### 2. 安装依赖

```bash
# 安装文档站点依赖
npm install

# 安装MCP服务器依赖
cd mcp-server
npm install
cd ..
```

### 3. 启动开发服务器

```bash
# 启动文档开发服务器
npm run docs:dev

# 在另一个终端启动MCP服务器
npm run mcp:dev
```

## 📖 文档站点

### 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:8080
```

### 构建生产版本

```bash
# 构建静态文件
npm run docs:build

# 构建文件位于 docs/.vuepress/dist
```

### 部署到GitHub Pages

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. GitHub Actions会自动构建和部署

## 🔧 MCP服务器

### 基本使用

MCP服务器允许AI编程工具读取文档内容。它提供了以下工具：

- `search_docs` - 搜索文档内容
- `get_doc_content` - 获取文档内容
- `list_docs` - 列出所有文档
- `get_doc_structure` - 获取文档结构

### 配置AI工具

#### Claude Desktop

在Claude Desktop的配置文件中添加：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "node",
      "args": ["/path/to/zongheng-doc/mcp-server/index.js"],
      "env": {}
    }
  }
}
```

#### Cursor

1. 打开Cursor设置
2. 找到MCP配置部分
3. 添加服务器配置：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "node",
      "args": ["/path/to/zongheng-doc/mcp-server/index.js"]
    }
  }
}
```

**注意**：
- 现在只需要配置`mcp-server/index.js`，它会自动定位到`dist/index.js`
- 确保MCP服务器已构建。如果使用GitHub仓库，需要先构建：
```bash
cd mcp-server
npm install
npm run build
```

### 测试MCP服务器

```bash
cd mcp-server
node test.js
```

## 📝 添加新文档

### 1. 创建文档文件

在`docs/`目录下创建Markdown文件：

```bash
# 创建新文档
touch docs/frontend/new-feature.md
```

### 2. 添加文档内容

```markdown
# 新功能

这是新功能的文档内容。

## 使用方法

```typescript
import { NewFeature } from '@zongheng/frontend'

const feature = new NewFeature()
```

## 示例

更多示例请参考...
```

### 3. 更新导航配置

在`docs/.vuepress/config.js`中添加导航：

```javascript
export default defineUserConfig({
  theme: defaultTheme({
    navbar: [
      // ... 现有导航
      {
        text: '新功能',
        link: '/frontend/new-feature',
      },
    ],
    sidebar: {
      '/frontend/': [
        {
          text: '前端框架',
          children: [
            // ... 现有文档
            '/frontend/new-feature',
          ],
        },
      ],
    },
  }),
})
```

## 🔍 搜索功能

### 基本搜索

```typescript
// 搜索所有文档
{
  "name": "search_docs",
  "arguments": {
    "query": "Vue组件"
  }
}

// 搜索特定类别
{
  "name": "search_docs",
  "arguments": {
    "query": "API设计",
    "category": "backend"
  }
}
```

### 高级搜索

```typescript
// 限制结果数量
{
  "name": "search_docs",
  "arguments": {
    "query": "状态管理",
    "limit": 5
  }
}
```

## 📄 获取文档内容

```typescript
// 获取完整文档内容
{
  "name": "get_doc_content",
  "arguments": {
    "path": "/frontend/getting-started"
  }
}
```

## 📋 列出文档

```typescript
// 列出所有文档
{
  "name": "list_docs",
  "arguments": {}
}

// 列出特定类别文档
{
  "name": "list_docs",
  "arguments": {
    "category": "frontend"
  }
}
```

## 🌳 获取文档结构

```typescript
// 获取文档目录结构
{
  "name": "get_doc_structure",
  "arguments": {}
}
```

## 🛠️ 开发指南

### 项目结构

```
zongheng-mcp/
├── docs/                    # VuePress文档
│   ├── .vuepress/          # VuePress配置
│   ├── frontend/           # 前端文档
│   ├── backend/            # 后端文档
│   └── README.md           # 首页
├── mcp-server/             # MCP服务器
│   ├── src/
│   │   ├── index.ts        # 服务器入口
│   │   └── services/       # 服务层
│   └── dist/               # 构建输出
├── .github/workflows/      # GitHub Actions
└── package.json
```

### 扩展MCP功能

1. 在`mcp-server/src/services/`中创建新服务
2. 在`mcp-server/src/index.ts`中注册新工具
3. 重新构建服务器

### 自定义主题

1. 在`docs/.vuepress/`中创建自定义主题
2. 修改`docs/.vuepress/config.js`配置
3. 重新构建文档站点

## 🚀 部署选项

### GitHub Pages

- 自动部署：推送到main分支
- 手动部署：运行`npm run deploy`

### Vercel

1. 连接GitHub仓库
2. 配置构建设置：
   - Build Command: `npm run docs:build`
   - Output Directory: `docs/.vuepress/dist`

### Netlify

1. 连接GitHub仓库
2. 配置构建设置：
   - Build Command: `npm run docs:build`
   - Publish Directory: `docs/.vuepress/dist`

### Docker

```bash
# 构建镜像
docker build -t zongheng-docs .

# 运行容器
docker run -p 80:80 zongheng-docs
```

## 🔧 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本（需要18+）
   - 清理node_modules重新安装
   - 检查依赖版本兼容性

2. **MCP服务器无法启动**
   - 确保已构建服务器：`npm run build`
   - 检查文档路径是否正确
   - 查看错误日志

3. **搜索无结果**
   - 检查文档文件是否存在
   - 尝试使用更简单的搜索词
   - 确认搜索类别设置

### 调试技巧

```bash
# 启用详细日志
DEBUG=* npm run docs:dev

# 检查构建产物
ls -la docs/.vuepress/dist

# 测试MCP服务器
cd mcp-server && node test.js
```

## 📞 获取帮助

- 查看 [GitHub Issues](https://github.com/your-username/zongheng-mcp/issues)
- 阅读 [VuePress文档](https://vuepress.vuejs.org/)
- 参考 [MCP协议文档](https://modelcontextprotocol.io/)

## 🤝 贡献

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

---

**开始你的纵横框架文档之旅吧！** 🎉
