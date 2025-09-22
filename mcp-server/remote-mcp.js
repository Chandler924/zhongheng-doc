#!/usr/bin/env node

// 纵横框架远程MCP服务器 - 支持通过args传递站点URL
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

class RemoteZonghengMCPServer {
  constructor(baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // 移除末尾的斜杠
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5分钟缓存

    this.server = new Server({
      name: 'zongheng-remote-mcp-server',
      version: '1.0.0',
    });

    this.setupHandlers();
  }

  setupHandlers() {
    // 列出可用工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_docs',
            description: `在文档站点中搜索相关内容（站点: ${this.baseUrl}）`,
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
            name: 'list_docs',
            description: `列出所有可用的文档（站点: ${this.baseUrl}）`,
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
            description: `获取文档的目录结构（站点: ${this.baseUrl}）`,
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_site_info',
            description: '获取当前配置的站点信息',
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
          case 'get_site_info':
            return await this.handleGetSiteInfo();
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

  async handleSearchDocs(args) {
    const { query, category = 'all', limit = 10 } = args;
    
    try {
      // 使用动态搜索功能
      const results = await this.searchDocuments(query, category, limit);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              query,
              category,
              results,
              total: results.length,
              site: this.baseUrl,
              searchMethod: 'dynamic'
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('搜索失败:', error);
      
      // 降级到简单搜索
      const documents = await this.listDocuments(category);
      const filteredDocs = documents.filter(doc => {
        return doc.title.toLowerCase().includes(query.toLowerCase()) ||
               doc.path.toLowerCase().includes(query.toLowerCase());
      });

      const results = filteredDocs.slice(0, limit).map(doc => ({
        title: doc.title,
        path: doc.path,
        excerpt: `这是关于${doc.title}的文档内容...`,
        score: 0.5,
        category: doc.category,
      }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              query,
              category,
              results,
              total: results.length,
              site: this.baseUrl,
              searchMethod: 'fallback'
            }, null, 2),
          },
        ],
      };
    }
  }

  async handleGetDocContent(args) {
    const { path } = args;
    
    // 构建URL
    let url;
    if (path === '/') {
      url = `${this.baseUrl}/index.html`;
    } else {
      url = `${this.baseUrl}${path}.html`;
    }

    try {
      // 检查缓存
      const cached = this.cache.get(url);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                path,
                title: cached.title,
                content: cached.content,
                url,
                site: this.baseUrl,
                cached: true
              }, null, 2),
            },
          ],
        };
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      // 提取标题
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '文档标题';

      // 缓存内容
      this.cache.set(url, {
        content: html,
        title,
        timestamp: Date.now()
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              path,
              title,
              content: html,
              url,
              site: this.baseUrl,
              cached: false
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(`获取文档失败: ${error.message}`);
    }
  }

  async handleListDocs(args) {
    const { category = 'all' } = args;
    
    try {
      // 使用动态文档发现
      const documents = await this.listDocuments(category);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              category,
              documents: documents.map(doc => ({
                path: doc.path,
                title: doc.title,
                category: doc.category
              })),
              total: documents.length,
              site: this.baseUrl,
              discoveryMethod: 'dynamic'
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('获取文档列表失败:', error);
      
      // 降级到基本文档列表
      const basicDocuments = [
        { path: '/', title: '纵横框架文档', category: 'general' },
        { path: '/frontend/guides/getting-started', title: '前端框架快速开始', category: 'frontend' },
        { path: '/backend/getting-started', title: '后端框架快速开始', category: 'backend' },
        { path: '/deployment', title: '部署指南', category: 'general' },
      ];

      const filteredDocs = category === 'all' 
        ? basicDocuments 
        : basicDocuments.filter(doc => doc.category === category);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              category,
              documents: filteredDocs,
              total: filteredDocs.length,
              site: this.baseUrl,
              discoveryMethod: 'fallback'
            }, null, 2),
          },
        ],
      };
    }
  }

  async handleGetDocStructure() {
    const structure = {
      frontend: [
        { title: '前端框架快速开始', path: '/frontend/getting-started' },
        { title: '组件库', path: '/frontend/components' },
        { title: '状态管理', path: '/frontend/state-management' },
        { title: '路由配置', path: '/frontend/routing' },
      ],
      backend: [
        { title: '后端框架快速开始', path: '/backend/getting-started' },
        { title: 'API设计指南', path: '/backend/api-design' },
        { title: '数据库', path: '/backend/database' },
        { title: '中间件', path: '/backend/middleware' },
      ],
      general: [
        { title: '纵横框架文档', path: '/' },
        { title: '部署指南', path: '/deployment' },
      ]
    };
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            ...structure,
            site: this.baseUrl
          }, null, 2),
        },
      ],
    };
  }

  async handleGetSiteInfo() {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            site: this.baseUrl,
            cacheSize: this.cache.size,
            cacheTimeout: this.cacheTimeout,
            version: '2.0.0',
            features: [
              'dynamic-document-discovery',
              'intelligent-search',
              'sitemap-parsing',
              'html-crawling',
              'fallback-mechanisms'
            ]
          }, null, 2),
        },
      ],
    };
  }

  // 动态文档发现方法
  async listDocuments(category = 'all') {
    try {
      // 尝试从站点地图获取
      const sitemapDocs = await this.discoverFromSitemap();
      if (sitemapDocs.length > 0) {
        return this.filterDocumentsByCategory(sitemapDocs, category);
      }

      // 尝试从爬取获取
      const crawledDocs = await this.discoverFromCrawling();
      if (crawledDocs.length > 0) {
        return this.filterDocumentsByCategory(crawledDocs, category);
      }

      // 降级到基本文档
      return this.getBasicDocuments(category);
    } catch (error) {
      console.error('动态文档发现失败:', error);
      return this.getBasicDocuments(category);
    }
  }

  async discoverFromSitemap() {
    try {
      const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
      const response = await fetch(sitemapUrl);
      
      if (!response.ok) {
        return [];
      }

      const sitemapXml = await response.text();
      const urls = this.parseSitemapXml(sitemapXml);
      
      const documents = [];
      for (const url of urls) {
        const path = this.extractPathFromUrl(url);
        if (path && this.isValidDocumentPath(path)) {
          documents.push({
            path,
            title: this.getTitleFromPath(path),
            category: this.determineCategory(path)
          });
        }
      }

      return documents;
    } catch (error) {
      console.error('从站点地图发现文档失败:', error);
      return [];
    }
  }

  async discoverFromCrawling() {
    try {
      const visited = new Set();
      const toVisit = ['/'];
      const documents = [];

      while (toVisit.length > 0 && visited.size < 50) {
        const currentPath = toVisit.shift();
        if (visited.has(currentPath)) continue;
        
        visited.add(currentPath);
        
        try {
          const content = await this.getDocumentContent(currentPath);
          if (content) {
            documents.push({
              path: currentPath,
              title: content.title,
              category: content.category
            });
            
            // 提取页面中的链接
            const links = this.extractLinksFromHtml(content.content);
            for (const link of links) {
              if (this.isValidDocumentPath(link) && !visited.has(link)) {
                toVisit.push(link);
              }
            }
          }
        } catch (error) {
          console.error(`爬取页面失败 ${currentPath}:`, error);
        }
      }

      return documents;
    } catch (error) {
      console.error('爬取发现文档失败:', error);
      return [];
    }
  }

  async searchDocuments(query, category = 'all', limit = 10) {
    const documents = await this.listDocuments(category);
    const results = [];
    
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);

    for (const doc of documents) {
      let score = 0;
      let excerpt = '';
      
      try {
        const content = await this.getDocumentContent(doc.path);
        if (content) {
          const text = this.extractTextFromHtml(content.content);
          const textLower = text.toLowerCase();
          const titleLower = doc.title.toLowerCase();
          
          // 计算匹配分数
          if (titleLower.includes(queryLower)) {
            score += 10;
          }
          
          for (const word of queryWords) {
            if (titleLower.includes(word)) {
              score += 5;
            }
            const matches = (textLower.match(new RegExp(word, 'g')) || []).length;
            score += matches * 2;
          }
          
          if (doc.path.toLowerCase().includes(queryLower)) {
            score += 3;
          }
          
          // 生成摘要
          if (text) {
            excerpt = this.generateExcerpt(text, queryWords);
          }
          
          if (score > 0) {
            results.push({
              path: doc.path,
              title: doc.title,
              excerpt: excerpt || `这是关于${doc.title}的文档内容...`,
              score: score / 10,
              category: doc.category
            });
          }
        }
      } catch (error) {
        console.error(`搜索文档失败 ${doc.path}:`, error);
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // 辅助方法
  parseSitemapXml(xml) {
    const urls = [];
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    
    while ((match = urlRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }
    
    return urls;
  }

  extractPathFromUrl(url) {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      if (path.startsWith('/zhongheng-doc')) {
        return path.replace('/zhongheng-doc', '') || '/';
      }
      
      return path;
    } catch (error) {
      return null;
    }
  }

  isValidDocumentPath(path) {
    if (path.includes('/assets/') || 
        path.includes('.css') || 
        path.includes('.js') || 
        path.includes('.png') || 
        path.includes('.jpg') || 
        path.includes('.ico')) {
      return false;
    }
    
    if (path.startsWith('/api/')) {
      return false;
    }
    
    return true;
  }

  getTitleFromPath(path) {
    return path
      .replace(/^\//, '')
      .replace(/\.html$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  determineCategory(path) {
    if (path.startsWith('/frontend/')) {
      return 'frontend';
    } else if (path.startsWith('/backend/')) {
      return 'backend';
    } else {
      return 'general';
    }
  }

  extractLinksFromHtml(html) {
    const links = [];
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1];
      
      if (href.startsWith('/')) {
        const path = href.replace('/zhongheng-doc', '') || '/';
        links.push(path);
      } else if (href.startsWith('./') || !href.includes('://')) {
        links.push(href);
      }
    }
    
    return [...new Set(links)];
  }

  extractTextFromHtml(html) {
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  generateExcerpt(text, queryWords) {
    const sentences = text.split(/[.!?。！？]/).filter(s => s.trim().length > 0);
    
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      for (const word of queryWords) {
        if (sentenceLower.includes(word)) {
          return sentence.trim().substring(0, 200) + (sentence.length > 200 ? '...' : '');
        }
      }
    }
    
    return text.substring(0, 200) + (text.length > 200 ? '...' : '');
  }

  filterDocumentsByCategory(documents, category) {
    if (category === 'all') {
      return documents;
    }
    return documents.filter(doc => doc.category === category);
  }

  getBasicDocuments(category) {
    const basicDocs = [
      { path: '/', title: '纵横框架文档', category: 'general' },
      { path: '/frontend/guides/getting-started', title: '前端框架快速开始', category: 'frontend' },
      { path: '/backend/getting-started', title: '后端框架快速开始', category: 'backend' },
      { path: '/deployment', title: '部署指南', category: 'general' }
    ];

    return this.filterDocumentsByCategory(basicDocs, category);
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
