#!/bin/bash

# 纵横框架文档站点部署脚本

set -e

echo "🚀 开始部署纵横框架文档站点..."

# 检查Node.js版本
echo "📋 检查环境..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ 错误: 需要Node.js 18或更高版本"
    exit 1
fi
echo "✅ Node.js版本: $(node -v)"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建文档站点
echo "🔨 构建文档站点..."
npm run docs:build

# 构建MCP服务器
echo "🔨 构建MCP服务器..."
cd mcp-server
npm install
npm run build
cd ..

# 检查构建结果
echo "✅ 检查构建结果..."
if [ ! -d "docs/.vuepress/dist" ]; then
    echo "❌ 错误: 文档构建失败"
    exit 1
fi

if [ ! -d "mcp-server/dist" ]; then
    echo "❌ 错误: MCP服务器构建失败"
    exit 1
fi

echo "✅ 构建完成!"

# 显示部署信息
echo ""
echo "📋 部署信息:"
echo "  - 文档站点: docs/.vuepress/dist"
echo "  - MCP服务器: mcp-server/dist"
echo ""

# 询问是否部署到GitHub Pages
read -p "是否部署到GitHub Pages? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 部署到GitHub Pages..."
    npm run deploy
    echo "✅ 部署完成!"
else
    echo "ℹ️  跳过GitHub Pages部署"
fi

echo ""
echo "🎉 部署脚本执行完成!"
echo ""
echo "📖 使用说明:"
echo "  - 文档站点: npm run docs:dev"
echo "  - MCP服务器: npm run mcp:dev"
echo "  - 测试MCP: cd mcp-server && node test.js"
echo ""
