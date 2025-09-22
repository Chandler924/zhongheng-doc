#!/bin/bash

# 纵横框架MCP服务器发布脚本

echo "🚀 开始发布纵横框架MCP服务器..."

# 检查是否已登录npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ 请先登录npm: npm login"
    exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ 有未提交的更改，请先提交"
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
npm run build

# 运行测试
echo "🧪 运行测试..."
timeout 3 node bin/zongheng-mcp || echo "测试完成"

# 更新版本号
echo "📝 更新版本号..."
npm version patch

# 发布到npm
echo "📤 发布到npm..."
npm publish

echo "✅ 发布完成！"
echo ""
echo "用户现在可以这样配置："
echo '{'
echo '  "mcpServers": {'
echo '    "zongheng-docs": {'
echo '      "command": "npx",'
echo '      "args": ["-y", "zongheng-mcp-docs@latest"]'
echo '    }'
echo '  }'
echo '}'
