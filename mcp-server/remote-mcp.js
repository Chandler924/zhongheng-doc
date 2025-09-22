#!/usr/bin/env node

// 纵横框架远程MCP服务器 - 支持通过args传递站点URL
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RemoteDocumentService } from './dist/RemoteDocumentService.js';
import fs from 'fs';
import path from 'path';

class RemoteZonghengMCPServer {
  constructor(baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // 移除末尾的斜杠
    this.documentService = new RemoteDocumentService(baseUrl);
    this.logFile = path.join(process.cwd(), 'error.txt');

    this.server = new Server({
      name: 'zongheng-remote-mcp-server',
      version: '2.0.0',
    });

    this.setupHandlers();
    this.initializeLogFile();
  }

  /**
   * 初始化日志文件
   */
  initializeLogFile() {
    try {
      const logHeader = `\n=== MCP服务日志 - ${new Date().toISOString()} ===\n`;
      fs.writeFileSync(this.logFile, logHeader, 'utf8');
      this.log('MCP服务启动', 'INFO');
    } catch (error) {
      // 静默处理初始化错误，避免影响MCP服务
    }
  }

  /**
   * 写入日志到文件
   */
  log(message, level = 'INFO', data = null) {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level,
        message,
        data: data ? JSON.stringify(data, null, 2) : null
      };
      
      const logLine = `[${timestamp}] [${level}] ${message}${data ? '\n' + data : ''}\n`;
      fs.appendFileSync(this.logFile, logLine, 'utf8');
      
      // 只输出到文件，不输出到控制台，避免MCP协议冲突
      // console.error(`[${level}] ${message}`);
      // if (data) {
      //   console.error(JSON.stringify(data, null, 2));
      // }
    } catch (error) {
      // 静默处理日志写入错误，避免影响MCP服务
    }
  }

  setupHandlers() {
    // 列出可用工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'zongheng-docs_search_docs',
            description: `智能搜索纵横框架文档内容，支持自然语言查询和组件特定搜索（站点: ${this.baseUrl}）。例如：查询z-dialog组件的用法、搜索按钮组件的API等`,
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: '搜索查询字符串，支持自然语言，如"查询z-dialog组件的用法"、"按钮组件的API"等',
                },
                category: {
                  type: 'string',
                  enum: ['frontend', 'backend', 'all'],
                  description: '搜索类别：frontend(前端)、backend(后端)、all(全部)',
                  default: 'all',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'zongheng-docs_list_docs',
            description: `列出所有可用的文档（站点: ${this.baseUrl}）`,
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  enum: ['frontend', 'backend', 'all'],
                  description: '文档类别：frontend(前端)、backend(后端)、all(全部)',
                  default: 'all',
                },
              },
            },
          },
          {
            name: 'zongheng-docs_get_doc_content',
            description: `获取指定文档的完整内容（站点: ${this.baseUrl}）`,
            inputSchema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: '文档路径，例如: /frontend/getting-started',
                },
              },
              required: ['path'],
            },
          },
          {
            name: 'zongheng-docs_get_doc_structure',
            description: `获取文档的目录结构（站点: ${this.baseUrl}）`,
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'zongheng-docs_health_check',
            description: `检查MCP服务健康状态（站点: ${this.baseUrl}）`,
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const startTime = Date.now();

      try {
        this.log(`开始处理工具调用: ${name}`, 'INFO', {
          tool: name,
          arguments: args,
          timestamp: new Date().toISOString()
        });
        
        let result;
        switch (name) {
          case 'zongheng-docs_search_docs':
            result = await this.handleSearchDocs(args);
            break;
          case 'zongheng-docs_list_docs':
            result = await this.handleListDocs(args);
            break;
          case 'zongheng-docs_get_doc_content':
            result = await this.handleGetDocContent(args);
            break;
          case 'zongheng-docs_get_doc_structure':
            result = await this.handleGetDocStructure();
            break;
          case 'zongheng-docs_health_check':
            result = await this.handleHealthCheck();
            break;
          default:
            throw new Error(`未知工具: ${name}`);
        }
        
        const endTime = Date.now();
        this.log(`工具调用成功: ${name}`, 'SUCCESS', {
          tool: name,
          duration: `${endTime - startTime}ms`,
          timestamp: new Date().toISOString()
        });
        
        return result;
      } catch (error) {
        const endTime = Date.now();
        this.log(`工具调用失败: ${name}`, 'ERROR', {
          tool: name,
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name
          },
          duration: `${endTime - startTime}ms`,
          timestamp: new Date().toISOString()
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: true,
                message: error instanceof Error ? error.message : String(error),
                tool: name,
                timestamp: new Date().toISOString()
              }, null, 2),
            },
          ],
          isError: true,
        };
      }
    });
  }

  async handleListDocs(args) {
    try {
      const { category = 'all' } = args;
      
      this.log(`列出文档，类别: ${category}`, 'INFO', {
        category,
        timestamp: new Date().toISOString()
      });
      
      // 添加超时机制，减少超时时间
      const listPromise = this.documentService.listDocuments(category);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('列出文档超时')), 10000); // 10秒超时
      });
      
      const documents = await Promise.race([listPromise, timeoutPromise]);
      
      this.log(`列出文档完成，找到 ${documents.length} 个文档`, 'SUCCESS', {
        category,
        documentCount: documents.length,
        timestamp: new Date().toISOString()
      });
      
      // 确保返回的数据结构正确
      const docList = documents.map(doc => {
        try {
          return {
            path: doc.path || '',
            title: doc.title || '',
            category: doc.category || 'general'
          };
        } catch (mapError) {
          // console.error('映射文档数据时出错:', mapError);
          return {
            path: '',
            title: '错误文档',
            category: 'general'
          };
        }
      });
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'listDocuments',
              category,
              documents: docList,
              total: docList.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      // console.error('列出文档失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'listDocuments',
              category: args?.category || 'all',
              documents: [],
              total: 0,
              error: {
                message: error.message,
                type: error.constructor.name
              },
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  async handleSearchDocs(args) {
    try {
      const { query, category = 'all' } = args;
      
      if (!query) {
        throw new Error('搜索查询不能为空');
      }
      
      this.log(`开始搜索: "${query}", 类别: ${category}`, 'INFO', {
        query,
        category,
        timestamp: new Date().toISOString()
      });
      
      // 添加超时机制，减少超时时间
      const searchPromise = this.documentService.searchDocuments(query, category);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('搜索超时')), 15000); // 15秒超时
      });
      
      const documents = await Promise.race([searchPromise, timeoutPromise]);
      
      this.log(`搜索完成，找到 ${documents.length} 个结果`, 'SUCCESS', {
        query,
        category,
        resultCount: documents.length,
        timestamp: new Date().toISOString()
      });
      
      // 确保返回的数据结构正确
      const results = documents.map(doc => {
        try {
          return {
            path: doc.path || '',
            title: doc.title || '',
            category: doc.category || 'general',
            content: (doc.content || '').substring(0, 800) + ((doc.content || '').length > 800 ? '...' : ''),
            relevance: this.calculateRelevance(doc, query)
          };
        } catch (mapError) {
          // console.error('映射文档数据时出错:', mapError);
          return {
            path: '',
            title: '错误文档',
            category: 'general',
            content: '文档数据解析错误',
            relevance: 0
          };
        }
      });
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'intelligentSearch',
              query,
              category,
              results,
              total: results.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      this.log('搜索文档失败', 'ERROR', {
        query: args?.query || '',
        category: args?.category || 'all',
        error: {
          message: error.message,
          type: error.constructor.name,
          stack: error.stack
        },
        timestamp: new Date().toISOString()
      });
      
      // 返回更详细的错误信息
      const errorInfo = {
        site: this.baseUrl,
        method: 'intelligentSearch',
        query: args?.query || '',
        category: args?.category || 'all',
        results: [],
        total: 0,
        error: {
          message: error.message,
          type: error.constructor.name,
          stack: error.stack
        },
        timestamp: new Date().toISOString()
      };
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(errorInfo, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  async handleGetDocContent(args) {
    try {
      const { path } = args;
      
      if (!path) {
        throw new Error('文档路径不能为空');
      }
      
      // console.error(`获取文档内容: ${path}`);
      
      // 添加超时机制
      const contentPromise = this.documentService.getDocumentContent(path);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('获取文档内容超时')), 15000); // 15秒超时
      });
      
      const content = await Promise.race([contentPromise, timeoutPromise]);
      
      // console.error(`获取文档内容完成，长度: ${content.length}`);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'getDocumentContent',
              path,
              content,
              length: content.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      // console.error('获取文档内容失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'getDocumentContent',
              path: args?.path || '',
              content: '',
              length: 0,
              error: error.message,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  async handleGetDocStructure() {
    try {
      // console.error('获取文档结构');
      
      // 添加超时机制
      const structurePromise = this.documentService.listDocuments('all');
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('获取文档结构超时')), 20000); // 20秒超时
      });
      
      const documents = await Promise.race([structurePromise, timeoutPromise]);
      
      // 构建文档结构
      const structure = this.buildDocumentStructure(documents);
      
      // console.error(`获取文档结构完成，总计 ${documents.length} 个文档`);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'getDocumentStructure',
              structure,
              total: documents.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      // console.error('获取文档结构失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'getDocumentStructure',
              structure: {},
              total: 0,
              error: error.message,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  }

  calculateRelevance(doc, query) {
    const searchText = `${doc.title} ${doc.content}`.toLowerCase();
    const queryLower = query.toLowerCase();
    
    let score = 0;
    
    // 标题匹配得分更高
    if (doc.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // 内容匹配
    const contentMatches = (searchText.match(new RegExp(queryLower, 'g')) || []).length;
    score += contentMatches;
    
    return Math.min(score, 100); // 限制最大得分为100
  }

  buildDocumentStructure(documents) {
    const structure = {
      frontend: [],
      backend: [],
      general: []
    };
    
    documents.forEach(doc => {
      structure[doc.category].push({
        path: doc.path,
        title: doc.title
      });
    });
    
    return structure;
  }

  async handleHealthCheck() {
    try {
      this.log('执行健康检查', 'INFO', {
        timestamp: new Date().toISOString()
      });
      
      const startTime = Date.now();
      
      // 测试基本连接
      const testPromise = this.documentService.listDocuments('all');
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('健康检查超时')), 5000); // 5秒超时
      });
      
      const documents = await Promise.race([testPromise, timeoutPromise]);
      const endTime = Date.now();
      
      const healthInfo = {
        status: 'healthy',
        site: this.baseUrl,
        method: 'healthCheck',
        checks: {
          connection: 'ok',
          documentCount: documents.length,
          responseTime: `${endTime - startTime}ms`,
          timestamp: new Date().toISOString()
        },
        version: '2.0.12',
        uptime: process.uptime()
      };
      
      this.log('健康检查完成', 'SUCCESS', healthInfo);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(healthInfo, null, 2),
          },
        ],
      };
    } catch (error) {
      this.log('健康检查失败', 'ERROR', {
        error: {
          message: error.message,
          stack: error.stack
        },
        timestamp: new Date().toISOString()
      });
      
      const healthInfo = {
        status: 'unhealthy',
        site: this.baseUrl,
        method: 'healthCheck',
        checks: {
          connection: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        },
        version: '2.0.12',
        uptime: process.uptime()
      };
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(healthInfo, null, 2),
          },
        ],
        isError: true,
      };
    }
  }



  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      
      this.log(`纵横框架远程MCP服务器已启动（站点: ${this.baseUrl}）`, 'SUCCESS', {
        baseUrl: this.baseUrl,
        logFile: this.logFile,
        timestamp: new Date().toISOString()
      });
      
      // 添加进程信号处理，确保优雅关闭
      process.on('SIGINT', () => {
        this.log('收到SIGINT信号，正在关闭服务器...', 'INFO');
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        this.log('收到SIGTERM信号，正在关闭服务器...', 'INFO');
        process.exit(0);
      });
      
      // 处理未捕获的异常
      process.on('uncaughtException', (error) => {
        this.log('未捕获的异常', 'ERROR', {
          error: {
            message: error.message,
            stack: error.stack
          }
        });
        process.exit(1);
      });
      
      process.on('unhandledRejection', (reason, promise) => {
        this.log('未处理的Promise拒绝', 'ERROR', {
          reason: reason,
          promise: promise
        });
        // 不退出进程，只是记录错误
      });
      
    } catch (error) {
      this.log('启动MCP服务器失败', 'ERROR', {
        error: {
          message: error.message,
          stack: error.stack
        }
      });
      process.exit(1);
    }
  }
}

// 从命令行参数或环境变量获取站点URL
let args = process.argv.slice(2);

// 如果是从可执行文件启动，从环境变量获取参数
if (process.env.MCP_ARGS) {
  try {
    args = JSON.parse(process.env.MCP_ARGS);
  } catch (e) {
    // 如果解析失败，使用原始参数
  }
}

let baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/';

// 检查是否有自定义URL参数
if (args.length > 0) {
  const urlArg = args.find(arg => arg.startsWith('--url=') || arg.startsWith('--site='));
  if (urlArg) {
    baseUrl = urlArg.split('=')[1];
  }
}

// 启动服务器
const server = new RemoteZonghengMCPServer(baseUrl);
server.run().catch(console.error);

// 导出类供测试使用
export { RemoteZonghengMCPServer };
