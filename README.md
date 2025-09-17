# 纵横框架文档站点

基于VuePress构建的纵横前端和后端框架文档站点，支持GitHub Pages部署和MCP服务集成。

## 🚀 快速开始

### 安装依赖

```bash
# 安装VuePress文档站点依赖
npm install

# 安装MCP服务器依赖
cd mcp-server
npm install
```

### 开发模式

```bash
# 启动文档开发服务器
npm run docs:dev

# 启动MCP服务器（在另一个终端）
npm run mcp:dev
```

### 构建和部署

```bash
# 构建文档站点
npm run docs:build

# 部署到GitHub Pages
npm run deploy
```

## 📁 项目结构

```
zongheng-mcp/
├── docs/                    # VuePress文档源文件
│   ├── .vuepress/          # VuePress配置
│   │   └── config.js       # 站点配置
│   ├── frontend/           # 前端框架文档
│   ├── backend/            # 后端框架文档
│   └── README.md           # 首页
├── mcp-server/             # MCP服务器
│   ├── src/
│   │   ├── index.ts        # 服务器入口
│   │   └── services/       # 服务层
│   ├── package.json
│   └── tsconfig.json
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml          # 部署配置
├── package.json
└── README.md
```

## 📖 文档内容

### 前端框架
- [快速开始](/frontend/getting-started) - 5分钟搭建应用
- [组件库](/frontend/components) - 丰富的UI组件
- [状态管理](/frontend/state-management) - 高效的状态管理
- [路由配置](/frontend/routing) - 灵活的路由系统

### 后端框架
- [快速开始](/backend/getting-started) - 快速搭建API服务
- [API设计](/backend/api-design) - RESTful API最佳实践
- [数据库](/backend/database) - 数据库操作指南
- [中间件](/backend/middleware) - 中间件开发指南

### 部署指南
- [部署指南](/deployment) - 各种平台的部署方法

## 🔧 MCP服务器

MCP（Model Context Protocol）服务器允许AI编程工具读取文档内容。

### 功能特性

- **文档搜索**：在文档中搜索相关内容
- **内容获取**：获取指定文档的完整内容
- **文档列表**：列出所有可用文档
- **结构浏览**：获取文档的目录结构

### 可用工具

1. `search_docs` - 搜索文档内容
2. `get_doc_content` - 获取文档内容
3. `list_docs` - 列出文档
4. `get_doc_structure` - 获取文档结构

### 使用示例

```typescript
// 搜索前端相关文档
{
  "name": "search_docs",
  "arguments": {
    "query": "Vue组件",
    "category": "frontend",
    "limit": 5
  }
}

// 获取特定文档内容
{
  "name": "get_doc_content",
  "arguments": {
    "path": "/frontend/getting-started"
  }
}
```

### 配置AI工具

在AI编程工具中配置MCP服务器：

```json
{
  "mcpServers": {
    "zongheng-docs": {
      "command": "node",
      "args": ["path/to/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

## 🚀 部署

### GitHub Pages

1. Fork此仓库
2. 在仓库设置中启用GitHub Pages
3. 推送代码到main分支
4. GitHub Actions会自动构建和部署

### 其他平台

- **Vercel**: 连接GitHub仓库，自动部署
- **Netlify**: 配置构建命令和输出目录
- **Docker**: 使用提供的Dockerfile构建镜像

## 🛠️ 开发

### 添加新文档

1. 在`docs/`目录下创建Markdown文件
2. 在`docs/.vuepress/config.js`中添加导航配置
3. 提交并推送更改

### 扩展MCP功能

1. 在`mcp-server/src/services/`中添加新服务
2. 在`mcp-server/src/index.ts`中注册新工具
3. 重新构建MCP服务器

### 本地测试

```bash
# 测试文档站点
npm run docs:dev
# 访问 http://localhost:8080

# 测试MCP服务器
npm run mcp:dev
# 使用MCP客户端连接测试
```

## 📝 贡献

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 支持

如果你觉得这个项目有用，请给它一个⭐️！

## 📞 联系方式

- 项目链接: [https://github.com/your-username/zongheng-mcp](https://github.com/your-username/zongheng-mcp)
- 问题反馈: [Issues](https://github.com/your-username/zongheng-mcp/issues)

---

**开始你的纵横框架之旅吧！** 🎉
