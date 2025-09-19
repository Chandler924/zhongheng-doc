export class RemoteDocumentService {
    baseUrl;
    cache = new Map();
    documentCache = new Map();
    cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
    documentCacheTimeout = 30 * 60 * 1000; // 30分钟文档列表缓存
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
        // 检查文档缓存
        const cacheKey = `documents_${category}`;
        const cached = this.documentCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.documentCacheTimeout) {
            return cached;
        }
        // 动态发现文档
        const documents = await this.discoverDocuments();
        // 过滤文档
        let filteredDocuments = documents;
        if (category !== 'all') {
            filteredDocuments = documents.filter(doc => doc.category === category);
        }
        // 缓存结果
        this.documentCache.set(cacheKey, filteredDocuments);
        this.documentCache.get(cacheKey).timestamp = Date.now();
        return filteredDocuments;
    }
    /**
     * 动态发现所有文档
     */
    async discoverDocuments() {
        const documents = [];
        try {
            // 方法1: 尝试从站点地图获取
            const sitemapDocs = await this.discoverFromSitemap();
            if (sitemapDocs.length > 0) {
                return sitemapDocs;
            }
            // 方法2: 从首页开始爬取链接
            const crawledDocs = await this.discoverFromCrawling();
            if (crawledDocs.length > 0) {
                return crawledDocs;
            }
            // 方法3: 基于VuePress配置的常见路径模式
            return await this.discoverFromCommonPatterns();
        }
        catch (error) {
            console.error('文档发现失败:', error);
            // 降级到基本路径
            return this.getBasicDocuments();
        }
    }
    /**
     * 从站点地图发现文档
     */
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
                    const doc = await this.createDocumentFromPath(path);
                    if (doc) {
                        documents.push(doc);
                    }
                }
            }
            return documents;
        }
        catch (error) {
            console.error('从站点地图发现文档失败:', error);
            return [];
        }
    }
    /**
     * 通过爬取页面链接发现文档
     */
    async discoverFromCrawling() {
        try {
            const visited = new Set();
            const toVisit = ['/'];
            const documents = [];
            while (toVisit.length > 0 && visited.size < 100) { // 限制爬取数量
                const currentPath = toVisit.shift();
                if (visited.has(currentPath))
                    continue;
                visited.add(currentPath);
                try {
                    const content = await this.getDocumentContent(currentPath);
                    if (content) {
                        documents.push(content);
                        // 提取页面中的链接
                        const links = this.extractLinksFromHtml(content.content);
                        for (const link of links) {
                            if (this.isValidDocumentPath(link) && !visited.has(link)) {
                                toVisit.push(link);
                            }
                        }
                    }
                }
                catch (error) {
                    console.error(`爬取页面失败 ${currentPath}:`, error);
                }
            }
            return documents;
        }
        catch (error) {
            console.error('爬取发现文档失败:', error);
            return [];
        }
    }
    /**
     * 基于常见路径模式发现文档
     */
    async discoverFromCommonPatterns() {
        const commonPaths = [
            '/',
            '/frontend/guides/getting-started',
            '/frontend/guides/state-management',
            '/frontend/architecture/overview',
            '/backend/getting-started',
            '/backend/api-design',
            '/deployment'
        ];
        // 动态发现组件文档
        const componentPaths = await this.discoverComponentPaths();
        commonPaths.push(...componentPaths);
        const documents = [];
        for (const path of commonPaths) {
            try {
                const doc = await this.createDocumentFromPath(path);
                if (doc) {
                    documents.push(doc);
                }
            }
            catch (error) {
                console.error(`创建文档失败 ${path}:`, error);
            }
        }
        return documents;
    }
    /**
     * 发现组件文档路径
     */
    async discoverComponentPaths() {
        const componentPaths = [];
        // 尝试访问组件索引页面
        const indexPaths = [
            '/frontend/components/mobile',
            '/frontend/components/pc'
        ];
        for (const indexPath of indexPaths) {
            try {
                const content = await this.getDocumentContent(indexPath);
                if (content) {
                    const links = this.extractLinksFromHtml(content.content);
                    componentPaths.push(...links.filter(link => link.includes('/frontend/components/') &&
                        link !== indexPath));
                }
            }
            catch (error) {
                console.error(`发现组件路径失败 ${indexPath}:`, error);
            }
        }
        return componentPaths;
    }
    /**
     * 获取基本文档列表（降级方案）
     */
    getBasicDocuments() {
        return [
            { path: '/', title: '纵横框架文档', category: 'general', content: '', frontmatter: {}, lastModified: new Date() },
            { path: '/frontend/guides/getting-started', title: '前端框架快速开始', category: 'frontend', content: '', frontmatter: {}, lastModified: new Date() },
            { path: '/backend/getting-started', title: '后端框架快速开始', category: 'backend', content: '', frontmatter: {}, lastModified: new Date() },
            { path: '/deployment', title: '部署指南', category: 'general', content: '', frontmatter: {}, lastModified: new Date() }
        ];
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
                // 如果文档已经有内容，直接使用
                let content = doc.content;
                if (!content) {
                    const docContent = await this.getDocumentContent(doc.path);
                    content = docContent?.content || '';
                }
                if (content) {
                    results.push({
                        path: doc.path,
                        title: doc.title,
                        text: this.extractTextFromHtml(content),
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
    /**
     * 智能搜索文档内容
     */
    async searchDocuments(query, category = 'all', limit = 10) {
        const documents = await this.listDocuments(category);
        const results = [];
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
        for (const doc of documents) {
            let score = 0;
            let excerpt = '';
            try {
                // 获取文档内容
                let content = doc.content;
                if (!content) {
                    const docContent = await this.getDocumentContent(doc.path);
                    content = docContent?.content || '';
                }
                const text = this.extractTextFromHtml(content);
                const textLower = text.toLowerCase();
                const titleLower = doc.title.toLowerCase();
                // 计算匹配分数
                // 标题完全匹配
                if (titleLower.includes(queryLower)) {
                    score += 10;
                }
                // 标题单词匹配
                for (const word of queryWords) {
                    if (titleLower.includes(word)) {
                        score += 5;
                    }
                }
                // 内容匹配
                for (const word of queryWords) {
                    const matches = (textLower.match(new RegExp(word, 'g')) || []).length;
                    score += matches * 2;
                }
                // 路径匹配
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
                        score: score / 10, // 标准化分数
                        category: doc.category
                    });
                }
            }
            catch (error) {
                console.error(`搜索文档失败 ${doc.path}:`, error);
            }
        }
        // 按分数排序并限制结果数量
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }
    /**
     * 生成文档摘要
     */
    generateExcerpt(text, queryWords) {
        const sentences = text.split(/[.!?。！？]/).filter(s => s.trim().length > 0);
        // 寻找包含查询词的句子
        for (const sentence of sentences) {
            const sentenceLower = sentence.toLowerCase();
            for (const word of queryWords) {
                if (sentenceLower.includes(word)) {
                    return sentence.trim().substring(0, 200) + (sentence.length > 200 ? '...' : '');
                }
            }
        }
        // 如果没有找到匹配的句子，返回开头部分
        return text.substring(0, 200) + (text.length > 200 ? '...' : '');
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
    /**
     * 解析站点地图XML
     */
    parseSitemapXml(xml) {
        const urls = [];
        const urlRegex = /<loc>(.*?)<\/loc>/g;
        let match;
        while ((match = urlRegex.exec(xml)) !== null) {
            urls.push(match[1]);
        }
        return urls;
    }
    /**
     * 从URL提取路径
     */
    extractPathFromUrl(url) {
        try {
            const urlObj = new URL(url);
            const path = urlObj.pathname;
            // 移除基础路径前缀
            if (path.startsWith('/zhongheng-doc')) {
                return path.replace('/zhongheng-doc', '') || '/';
            }
            return path;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * 验证是否为有效的文档路径
     */
    isValidDocumentPath(path) {
        // 排除静态资源
        if (path.includes('/assets/') ||
            path.includes('.css') ||
            path.includes('.js') ||
            path.includes('.png') ||
            path.includes('.jpg') ||
            path.includes('.ico')) {
            return false;
        }
        // 排除API路径
        if (path.startsWith('/api/')) {
            return false;
        }
        return true;
    }
    /**
     * 从路径创建文档对象
     */
    async createDocumentFromPath(path) {
        try {
            const content = await this.getDocumentContent(path);
            if (content) {
                return content;
            }
            // 如果无法获取内容，创建基本信息
            return {
                path,
                title: this.getTitleFromPath(path),
                content: '',
                frontmatter: {},
                lastModified: new Date(),
                category: this.determineCategory(path)
            };
        }
        catch (error) {
            console.error(`创建文档失败 ${path}:`, error);
            return null;
        }
    }
    /**
     * 从HTML中提取链接
     */
    extractLinksFromHtml(html) {
        const links = [];
        const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
        let match;
        while ((match = linkRegex.exec(html)) !== null) {
            const href = match[1];
            // 处理相对链接
            if (href.startsWith('/')) {
                // 移除基础路径前缀
                const path = href.replace('/zhongheng-doc', '') || '/';
                links.push(path);
            }
            else if (href.startsWith('./') || !href.includes('://')) {
                // 处理相对路径
                links.push(href);
            }
        }
        return [...new Set(links)]; // 去重
    }
}
//# sourceMappingURL=RemoteDocumentService.js.map