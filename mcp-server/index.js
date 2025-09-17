#!/usr/bin/env node

// 简单的入口文件，自动定位到dist目录
import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist', 'index.js');

// 检查dist文件是否存在
if (!fs.existsSync(distPath)) {
  console.error('MCP服务器未构建，请先运行: cd mcp-server && npm run build');
  process.exit(1);
}

// 启动MCP服务器
const child = spawn('node', [distPath], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('error', (error) => {
  console.error('启动MCP服务器失败:', error);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code);
});
