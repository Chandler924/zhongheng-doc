# 纵横MCP服务安装指南

## ✅ 已解决的问题

MCP服务现在可以正常安装和使用了！版本 `2.0.8` 已经修复了所有安装问题。

## 🚀 快速安装

### 在Cursor中配置

在Cursor的MCP配置文件中添加：

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

### 在Claude Desktop中配置

在Claude Desktop的配置文件中添加：

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

### 自定义文档站点

如果需要使用其他文档站点：

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

## 🎯 使用示例

安装完成后，您可以使用以下查询：

### 智能搜索示例

- `"查询z-dialog组件的用法"`
- `"按钮组件的API"`
- `"如何使用表单组件"`
- `"表格组件的示例"`
- `"前端框架快速开始"`

### 可用工具

1. **zongheng-docs_search_docs** - 智能搜索文档
2. **zongheng-docs_list_docs** - 列出所有文档
3. **zongheng-docs_get_doc_content** - 获取指定文档内容
4. **zongheng-docs_get_doc_structure** - 获取文档结构

## 🔧 故障排除

### 如果安装失败

1. 确保Node.js版本 >= 18.0.0
2. 检查网络连接
3. 清除npm缓存：`npm cache clean --force`

### 如果服务无法启动

1. 检查MCP配置文件语法是否正确
2. 确保使用最新版本：`zongheng-mcp-docs@latest`
3. 查看日志输出获取详细错误信息

## 📋 版本历史

- **2.0.8** - 修复安装问题，添加智能搜索功能
- **2.0.7** - 添加多层缓存机制
- **2.0.6** - 改进内容提取算法
- **2.0.5** - 基础功能版本

## 🎉 成功标志

当您看到以下输出时，说明安装成功：

```
纵横框架远程MCP服务器已启动（站点: https://moli2.zt.com.cn/zongheng-doc）
```

现在您可以开始使用智能文档搜索功能了！
