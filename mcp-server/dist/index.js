#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { DocumentService } from './services/DocumentService.js';
import { SearchService } from './services/SearchService.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 获取文档根目录
const DOCS_ROOT = join(__dirname, '../../docs');
class ZonghengMCPServer {
    server;
    documentService;
    searchService;
    constructor() {
        this.server = new Server({
            name: 'zongheng-mcp-server',
            version: '1.0.0',
        });
        this.documentService = new DocumentService(DOCS_ROOT);
        this.searchService = new SearchService(this.documentService);
        this.setupHandlers();
    }
    setupHandlers() {
        // 列出可用工具
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'search_docs',
                        description: '在纵横框架文档中搜索相关内容',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                query: {
                                    type: 'string',
                                    description: '搜索查询字符串',
                                },
                                category: {
                                    type: 'string',
                                    description: '搜索类别 (frontend, backend, all)',
                                    enum: ['frontend', 'backend', 'all'],
                                    default: 'all',
                                },
                                limit: {
                                    type: 'number',
                                    description: '返回结果的最大数量',
                                    default: 10,
                                },
                            },
                            required: ['query'],
                        },
                    },
                    {
                        name: 'get_doc_content',
                        description: '获取指定文档的完整内容',
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
                        name: 'list_docs',
                        description: '列出所有可用的文档',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                category: {
                                    type: 'string',
                                    description: '文档类别 (frontend, backend, all)',
                                    enum: ['frontend', 'backend', 'all'],
                                    default: 'all',
                                },
                            },
                        },
                    },
                    {
                        name: 'get_doc_structure',
                        description: '获取文档的目录结构',
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
                    case 'search_docs':
                        return await this.handleSearchDocs(args);
                    case 'get_doc_content':
                        return await this.handleGetDocContent(args);
                    case 'list_docs':
                        return await this.handleListDocs(args);
                    case 'get_doc_structure':
                        return await this.handleGetDocStructure();
                    default:
                        throw new Error(`未知工具: ${name}`);
                }
            }
            catch (error) {
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
    async handleSearchDocs(args) {
        const { query, category = 'all', limit = 10 } = args;
        const results = await this.searchService.search(query, {
            category,
            limit,
        });
        const formattedResults = results.map(result => ({
            title: result.title,
            path: result.path,
            excerpt: result.excerpt,
            score: result.score,
            category: result.category,
        }));
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        query,
                        category,
                        results: formattedResults,
                        total: results.length,
                    }, null, 2),
                },
            ],
        };
    }
    async handleGetDocContent(args) {
        const { path } = args;
        const content = await this.documentService.getDocumentContent(path);
        if (!content) {
            throw new Error(`文档不存在: ${path}`);
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        path,
                        title: content.title,
                        content: content.content,
                        frontmatter: content.frontmatter,
                        lastModified: content.lastModified,
                    }, null, 2),
                },
            ],
        };
    }
    async handleListDocs(args) {
        const { category = 'all' } = args;
        const docs = await this.documentService.listDocuments(category);
        const formattedDocs = docs.map(doc => ({
            path: doc.path,
            title: doc.title,
            category: doc.category,
            lastModified: doc.lastModified,
        }));
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        category,
                        documents: formattedDocs,
                        total: docs.length,
                    }, null, 2),
                },
            ],
        };
    }
    async handleGetDocStructure() {
        const structure = await this.documentService.getDocumentStructure();
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(structure, null, 2),
                },
            ],
        };
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('纵横框架MCP服务器已启动');
    }
}
// 启动服务器
const server = new ZonghengMCPServer();
server.run().catch(console.error);
//# sourceMappingURL=index.js.map