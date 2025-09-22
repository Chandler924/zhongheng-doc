export class RemoteDocumentService {
    baseUrl;
    cache = new Map();
    documentCache = new Map();
    cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
    documentCacheTimeout = 30 * 60 * 1000; // 30分钟文档列表缓存
    constructor(baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/') {
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
        // 从站点地图获取文档
        const documents = await this.discoverFromSitemap();
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
     * 从站点地图发现文档
     */
    async discoverFromSitemap() {
        try {
            const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
            console.log(`正在从sitemap获取文档: ${sitemapUrl}`);
            const response = await fetch(sitemapUrl);
            if (!response.ok) {
                console.log(`sitemap获取失败: HTTP ${response.status}`);
                return [];
            }
            const sitemapXml = await response.text();
            const urls = this.parseSitemapXml(sitemapXml);
            console.log(`从sitemap解析到 ${urls.length} 个URL`);
            const documents = [];
            const validPaths = new Set();
            // 先过滤出有效的路径
            for (const url of urls) {
                const path = this.extractPathFromUrl(url);
                if (path && this.isValidDocumentPath(path)) {
                    validPaths.add(path);
                }
            }
            console.log(`过滤后得到 ${validPaths.size} 个有效文档路径`);
            // 批量处理文档创建
            const pathArray = Array.from(validPaths);
            const batchSize = 10; // 批量处理，避免并发过多
            for (let i = 0; i < pathArray.length; i += batchSize) {
                const batch = pathArray.slice(i, i + batchSize);
                const batchPromises = batch.map(async (path) => {
                    try {
                        const doc = await this.createDocumentFromPath(path);
                        return doc;
                    }
                    catch (error) {
                        console.error(`创建文档失败 ${path}:`, error);
                        return null;
                    }
                });
                const batchResults = await Promise.all(batchPromises);
                documents.push(...batchResults.filter(doc => doc !== null));
                // 添加小延迟，避免请求过于频繁
                if (i + batchSize < pathArray.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            console.log(`从sitemap成功创建 ${documents.length} 个文档`);
            return documents;
        }
        catch (error) {
            console.error('从站点地图发现文档失败:', error);
            return [];
        }
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
     * 测试sitemap功能
     */
    async testSitemap() {
        try {
            const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
            console.log(`测试sitemap: ${sitemapUrl}`);
            const response = await fetch(sitemapUrl);
            if (!response.ok) {
                return {
                    success: false,
                    urlCount: 0,
                    documentCount: 0,
                    error: `HTTP ${response.status}: ${response.statusText}`
                };
            }
            const sitemapXml = await response.text();
            const urls = this.parseSitemapXml(sitemapXml);
            console.log(`从sitemap解析到 ${urls.length} 个URL`);
            // 测试创建文档
            const validPaths = new Set();
            for (const url of urls) {
                const path = this.extractPathFromUrl(url);
                if (path && this.isValidDocumentPath(path)) {
                    validPaths.add(path);
                }
            }
            console.log(`有效文档路径: ${validPaths.size} 个`);
            return {
                success: true,
                urlCount: urls.length,
                documentCount: validPaths.size
            };
        }
        catch (error) {
            return {
                success: false,
                urlCount: 0,
                documentCount: 0,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    /**
     * 智能搜索文档内容（支持大小写查询）
     */
    async searchDocuments(query, category = 'all', limit = 10) {
        const documents = await this.listDocuments(category);
        const results = [];
        // 支持大小写查询，同时保留原始查询和转换为小写
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
                // 标题完全匹配（大小写敏感）
                if (doc.title.includes(query)) {
                    score += 15; // 提高大小写匹配的分数
                }
                // 标题完全匹配（忽略大小写）
                else if (titleLower.includes(queryLower)) {
                    score += 10;
                }
                // 标题单词匹配（忽略大小写）
                for (const word of queryWords) {
                    if (titleLower.includes(word)) {
                        score += 5;
                    }
                }
                // 内容匹配（忽略大小写）
                for (const word of queryWords) {
                    const matches = (textLower.match(new RegExp(word, 'g')) || []).length;
                    score += matches * 2;
                }
                // 路径匹配（忽略大小写）
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
        // 如果路径已经以.html结尾，直接使用
        if (urlPath.endsWith('.html')) {
            return `${this.baseUrl}${urlPath}`;
        }
        // 其他路径添加.html后缀
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
        try {
            // 使用更精确的正则表达式解析XML
            const urlRegex = /<loc>\s*(.*?)\s*<\/loc>/g;
            let match;
            while ((match = urlRegex.exec(xml)) !== null) {
                const url = match[1].trim();
                if (url && this.isValidSitemapUrl(url)) {
                    urls.push(url);
                }
            }
            // 去重并排序
            return [...new Set(urls)].sort();
        }
        catch (error) {
            console.error('解析sitemap XML失败:', error);
            return [];
        }
    }
    /**
     * 验证sitemap中的URL是否有效
     */
    isValidSitemapUrl(url) {
        try {
            const urlObj = new URL(url);
            // 检查路径是否包含基础路径
            if (!urlObj.pathname.startsWith('/zongheng-doc/')) {
                return false;
            }
            // 排除一些特殊路径
            if (urlObj.pathname.includes('/assets/') ||
                urlObj.pathname.includes('.css') ||
                urlObj.pathname.includes('.js') ||
                urlObj.pathname.includes('.png') ||
                urlObj.pathname.includes('.jpg') ||
                urlObj.pathname.includes('.ico') ||
                urlObj.pathname.includes('.svg')) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * 从URL提取路径
     */
    extractPathFromUrl(url) {
        try {
            const urlObj = new URL(url);
            let path = urlObj.pathname;
            // 移除基础路径前缀
            if (path.startsWith('/zhongheng-doc')) {
                path = path.replace('/zhongheng-doc', '') || '/';
            }
            // 移除.html后缀
            if (path.endsWith('.html')) {
                path = path.slice(0, -5);
            }
            // 确保路径以/开头
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            // 处理根路径
            if (path === '') {
                path = '/';
            }
            return path;
        }
        catch (error) {
            console.error(`URL解析失败: ${url}`, error);
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
}
//# sourceMappingURL=RemoteDocumentService.js.map