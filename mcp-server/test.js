#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 启动MCP服务器
const server = spawn('node', [join(__dirname, 'dist/index.js')], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// 测试消息
const testMessages = [
  {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list'
  },
  {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'list_docs',
      arguments: { category: 'all' }
    }
  }
];

let messageIndex = 0;

// 发送测试消息
function sendNextMessage() {
  if (messageIndex < testMessages.length) {
    const message = testMessages[messageIndex];
    console.log('发送消息:', JSON.stringify(message, null, 2));
    server.stdin.write(JSON.stringify(message) + '\n');
    messageIndex++;
  } else {
    // 测试完成，关闭服务器
    setTimeout(() => {
      server.kill();
      process.exit(0);
    }, 1000);
  }
}

// 处理服务器响应
server.stdout.on('data', (data) => {
  const response = data.toString().trim();
  console.log('服务器响应:', response);
  
  // 发送下一个消息
  setTimeout(sendNextMessage, 500);
});

// 处理错误
server.stderr.on('data', (data) => {
  console.error('服务器错误:', data.toString());
});

server.on('close', (code) => {
  console.log(`服务器退出，代码: ${code}`);
});

// 开始测试
console.log('开始测试MCP服务器...');
sendNextMessage();
