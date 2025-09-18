export class RemoteDocumentService {
    baseUrl;
    cache = new Map();
    cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
    constructor(baseUrl = 'https://chandler924.github.io/zhongheng-doc') {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // 移除末尾的斜杠
    }
    async getDocumentContent(path) {
        try {
            // 构建URL
            const url = this.buildUrl(path);
            // 检查缓存
            const cached = this.cache.get(url);
            if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
                return this.parseHtmlContent(cached.content, path);
            }
            // 获取内容
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const html = await response.text();
            // 缓存内容
            this.cache.set(url, {
                content: html,
                timestamp: Date.now()
            });
            return this.parseHtmlContent(html, path);
        }
        catch (error) {
            console.error(`获取文档失败 ${path}:`, error);
            return null;
        }
    }
    async listDocuments(category = 'all') {
        // 预定义的文档列表
        const documents = [
            { path: '/', title: '纵横框架文档', category: 'general' },
            { path: '/frontend/getting-started', title: '前端框架快速开始', category: 'frontend' },
            { path: '/frontend/components', title: '组件库', category: 'frontend' },
            { path: '/frontend/state-management', title: '状态管理', category: 'frontend' },
            { path: '/frontend/routing', title: '路由配置', category: 'frontend' },
            { path: '/backend/getting-started', title: '后端框架快速开始', category: 'backend' },
            { path: '/backend/api-design', title: 'API设计指南', category: 'backend' },
            { path: '/backend/database', title: '数据库', category: 'backend' },
            { path: '/backend/middleware', title: '中间件', category: 'backend' },
            { path: '/deployment', title: '部署指南', category: 'general' },
        ];
        if (category === 'all') {
            return documents.map(doc => ({
                ...doc,
                content: '',
                frontmatter: {},
                lastModified: new Date()
            }));
        }
        return documents
            .filter(doc => doc.category === category)
            .map(doc => ({
            ...doc,
            content: '',
            frontmatter: {},
            lastModified: new Date()
        }));
    }
    async getDocumentStructure() {
        const documents = await this.listDocuments();
        return {
            frontend: documents
                .filter(doc => doc.category === 'frontend')
                .map(doc => ({ title: doc.title, path: doc.path })),
            backend: documents
                .filter(doc => doc.category === 'backend')
                .map(doc => ({ title: doc.title, path: doc.path })),
            general: documents
                .filter(doc => doc.category === 'general')
                .map(doc => ({ title: doc.title, path: doc.path }))
        };
    }
    async getAllDocumentTexts() {
        const documents = await this.listDocuments();
        const results = [];
        for (const doc of documents) {
            try {
                const content = await this.getDocumentContent(doc.path);
                if (content) {
                    results.push({
                        path: doc.path,
                        title: doc.title,
                        text: this.extractTextFromHtml(content.content),
                        category: doc.category
                    });
                }
            }
            catch (error) {
                console.error(`获取文档内容失败 ${doc.path}:`, error);
            }
        }
        return results;
    }
    buildUrl(path) {
        // 处理路径
        let urlPath = path;
        if (!urlPath.startsWith('/')) {
            urlPath = '/' + urlPath;
        }
        // 如果是根路径，返回index.html
        if (urlPath === '/') {
            return `${this.baseUrl}/index.html`;
        }
        // 其他路径直接拼接
        return `${this.baseUrl}${urlPath}.html`;
    }
    parseHtmlContent(html, path) {
        // 提取标题
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : this.getTitleFromPath(path);
        // 提取主要内容
        const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
            html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
            html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
        const content = contentMatch ? contentMatch[1] : html;
        // 确定类别
        const category = this.determineCategory(path);
        return {
            path,
            title,
            content,
            frontmatter: {},
            lastModified: new Date(),
            category
        };
    }
    extractTextFromHtml(html) {
        // 简单的HTML标签移除
        return html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
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
        }
        else if (path.startsWith('/backend/')) {
            return 'backend';
        }
        else {
            return 'general';
        }
    }
}
//# sourceMappingURL=RemoteDocumentService.js.map