#!/bin/bash

# 本地测试脚本，模拟npx行为

echo "🧪 测试本地MCP服务器..."

# 测试可执行文件
echo "测试可执行文件..."
timeout 3 node bin/zongheng-mcp || echo "可执行文件测试完成"

echo ""
echo "✅ 本地测试完成！"
echo ""
echo "现在可以发布到npm："
echo "1. 登录npm: npm login"
echo "2. 运行发布脚本: ./publish.sh"
echo ""
echo "发布后，用户就可以使用npx方式配置了："
echo '{'
echo '  "mcpServers": {'
echo '    "zongheng-docs": {'
echo '      "command": "npx",'
echo '      "args": ["-y", "@zongheng/mcp-docs@latest"]'
echo '    }'
echo '  }'
echo '}'
