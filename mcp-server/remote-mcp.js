#!/usr/bin/env node

// 纵横框架远程MCP服务器 - 支持通过args传递站点URL
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RemoteDocumentService } from './dist/RemoteDocumentService.js';

class RemoteZonghengMCPServer {
  constructor(baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // 移除末尾的斜杠
    this.documentService = new RemoteDocumentService(baseUrl);

    this.server = new Server({
      name: 'zongheng-remote-mcp-server',
      version: '2.0.0',
    });

    this.setupHandlers();
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
        ],
      };
    });

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'zongheng-docs_search_docs':
            return await this.handleSearchDocs(args);
          case 'zongheng-docs_list_docs':
            return await this.handleListDocs(args);
          case 'zongheng-docs_get_doc_content':
            return await this.handleGetDocContent(args);
          case 'zongheng-docs_get_doc_structure':
            return await this.handleGetDocStructure();
          default:
            throw new Error(`未知工具: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `错误: ${error instanceof Error ? error.message : String(error)}`,
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
      
      // 调用RemoteDocumentService的listDocuments方法
      const documents = await this.documentService.listDocuments(category);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'listDocuments',
              category,
              documents: documents.map(doc => ({
                path: doc.path,
                title: doc.title,
                category: doc.category
              })),
              total: documents.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('列出文档失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'listDocuments',
              category: args.category || 'all',
              documents: [],
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

  async handleSearchDocs(args) {
    try {
      const { query, category = 'all' } = args;
      
      if (!query) {
        throw new Error('搜索查询不能为空');
      }
      
      // 调用RemoteDocumentService的智能搜索方法
      const documents = await this.documentService.searchDocuments(query, category);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'intelligentSearch',
              query,
              category,
              results: documents.map(doc => ({
                path: doc.path,
                title: doc.title,
                category: doc.category,
                content: doc.content.substring(0, 800) + (doc.content.length > 800 ? '...' : ''),
                relevance: this.calculateRelevance(doc, query)
              })),
              total: documents.length,
              timestamp: new Date().toISOString()
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('搜索文档失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'intelligentSearch',
              query: args.query || '',
              category: args.category || 'all',
              results: [],
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

  async handleGetDocContent(args) {
    try {
      const { path } = args;
      
      if (!path) {
        throw new Error('文档路径不能为空');
      }
      
      // 获取文档内容
      const content = await this.documentService.getDocumentContent(path);
      
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
      console.error('获取文档内容失败:', error);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              site: this.baseUrl,
              method: 'getDocumentContent',
              path: args.path || '',
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
      // 获取所有文档
      const documents = await this.documentService.listDocuments('all');
      
      // 构建文档结构
      const structure = this.buildDocumentStructure(documents);
      
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
      console.error('获取文档结构失败:', error);
      
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



  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`纵横框架远程MCP服务器已启动（站点: ${this.baseUrl}）`);
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
