export class RemoteDocumentService {
    baseUrl;
    documentCache = new Map();
    contentCache = new Map();
    documentCacheTimeout = 60 * 60 * 1000; // 1小时文档列表缓存
    contentCacheTimeout = 10 * 60 * 1000; // 10分钟内容缓存
    searchCache = new Map();
    searchCacheTimeout = 5 * 60 * 1000; // 5分钟搜索缓存
    ignoreSSL = true; // 忽略SSL证书验证
    constructor(baseUrl = 'https://moli2.zt.com.cn/zongheng-doc/') {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // 移除末尾的斜杠
    }
    /**
     * 获取文档内容 - 增强版本，添加重试机制
     */
    async getDocumentContent(path) {
        const maxRetries = 3;
        const retryDelay = 1000; // 1秒
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                // 构建URL
                const url = this.buildUrl(path);
                // 检查缓存
                const cached = this.contentCache.get(url);
                if (cached && Date.now() - cached.timestamp < this.contentCacheTimeout) {
                    return cached.content;
                }
                // 添加超时机制
                const fetchPromise = this.customFetch(url);
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('请求超时')), 10000); // 10秒超时
                });
                const response = await Promise.race([fetchPromise, timeoutPromise]);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.warn(`文档不存在: ${path}`);
                        return '';
                    }
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const html = await response.text();
                // 提取文本内容
                const content = this.extractTextFromHtml(html);
                // 缓存内容
                this.contentCache.set(url, {
                    content,
                    timestamp: Date.now()
                });
                return content;
            }
            catch (error) {
                console.error(`获取文档内容失败 ${path} (尝试 ${attempt}/${maxRetries}):`, error);
                if (attempt === maxRetries) {
                    // 最后一次尝试失败，返回空内容而不是抛出错误
                    console.error(`获取文档内容最终失败 ${path}:`, error);
                    return '';
                }
                // 等待后重试
                await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
            }
        }
        return '';
    }
    /**
     * 自定义fetch方法，处理SSL证书问题
     */
    async customFetch(url, options = {}) {
        if (this.ignoreSSL) {
            // 设置环境变量忽略SSL证书验证
            const originalNODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        ...options.headers
                    }
                });
                return response;
            }
            finally {
                // 恢复原始设置
                if (originalNODE_TLS_REJECT_UNAUTHORIZED !== undefined) {
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalNODE_TLS_REJECT_UNAUTHORIZED;
                }
                else {
                    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
                }
            }
        }
        else {
            return fetch(url, options);
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
     * 智能搜索文档 - 支持自然语言查询和组件特定搜索
     */
    async searchDocuments(query, category = 'all') {
        try {
            // 检查搜索缓存
            const cacheKey = `search_${query}_${category}`;
            const cached = this.searchCache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < this.searchCacheTimeout) {
                // console.log(`使用搜索缓存: ${query}`);
                return cached.results;
            }
            // 获取所有文档
            const allDocuments = await this.listDocuments('all');
            // 过滤文档
            let documents = allDocuments;
            if (category !== 'all') {
                documents = allDocuments.filter(doc => doc.category === category);
            }
            // 解析查询意图
            const searchIntent = this.parseSearchIntent(query);
            // 执行智能搜索
            const searchResults = this.performIntelligentSearch(documents, searchIntent);
            // 缓存搜索结果
            this.searchCache.set(cacheKey, {
                results: searchResults,
                timestamp: Date.now()
            });
            // 清理过期的搜索缓存
            this.cleanupSearchCache();
            return searchResults;
        }
        catch (error) {
            console.error('搜索文档失败:', error);
            return [];
        }
    }
    /**
     * 清理过期的搜索缓存
     */
    cleanupSearchCache() {
        const now = Date.now();
        for (const [key, value] of this.searchCache.entries()) {
            if (now - value.timestamp > this.searchCacheTimeout) {
                this.searchCache.delete(key);
            }
        }
    }
    /**
     * 解析搜索意图
     */
    parseSearchIntent(query) {
        const queryLower = query.toLowerCase();
        // 检测组件查询
        const componentMatch = queryLower.match(/(?:查询|搜索|使用|用法|组件)\s*([a-z-]+)/i);
        const component = componentMatch ? componentMatch[1] : null;
        // 检测操作类型
        const operationTypes = {
            usage: ['用法', '使用', '怎么用', '如何使用', '怎么使用'],
            api: ['api', '接口', '方法', '属性', '参数'],
            example: ['示例', '例子', 'demo', '代码'],
            guide: ['指南', '教程', '快速开始', '入门']
        };
        let operationType = 'general';
        for (const [type, keywords] of Object.entries(operationTypes)) {
            if (keywords.some(keyword => queryLower.includes(keyword))) {
                operationType = type;
                break;
            }
        }
        // 提取关键词
        const keywords = queryLower
            .replace(/[查询搜索使用用法组件示例例子指南教程]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 1)
            .slice(0, 5); // 限制关键词数量
        return {
            originalQuery: query,
            component,
            operationType,
            keywords,
            isComponentQuery: !!component
        };
    }
    /**
     * 执行智能搜索
     */
    performIntelligentSearch(documents, intent) {
        const results = [];
        for (const doc of documents) {
            let score = 0;
            const searchText = `${doc.title} ${doc.content}`.toLowerCase();
            // 组件特定搜索
            if (intent.isComponentQuery && intent.component) {
                const componentScore = this.calculateComponentScore(doc, intent.component);
                score += componentScore;
            }
            // 关键词匹配
            for (const keyword of intent.keywords) {
                if (searchText.includes(keyword)) {
                    score += 2;
                    // 标题中的关键词得分更高
                    if (doc.title.toLowerCase().includes(keyword)) {
                        score += 5;
                    }
                }
            }
            // 操作类型匹配
            const operationScore = this.calculateOperationScore(doc, intent.operationType);
            score += operationScore;
            // 完整查询匹配
            if (searchText.includes(intent.originalQuery.toLowerCase())) {
                score += 10;
            }
            // 模糊匹配
            const fuzzyScore = this.calculateFuzzyScore(doc, intent);
            score += fuzzyScore;
            if (score > 0) {
                results.push({ doc, score });
            }
        }
        // 按得分排序
        results.sort((a, b) => b.score - a.score);
        // 返回前20个结果
        return results.slice(0, 20).map(item => item.doc);
    }
    /**
     * 计算组件匹配得分
     */
    calculateComponentScore(doc, component) {
        const searchText = `${doc.title} ${doc.content}`.toLowerCase();
        const componentLower = component.toLowerCase();
        let score = 0;
        // 精确匹配
        if (searchText.includes(componentLower)) {
            score += 15;
        }
        // 组件名称变体匹配
        const variants = [
            componentLower,
            componentLower.replace(/-/g, ''),
            componentLower.replace(/-/g, '_'),
            `z-${componentLower}`,
            `${componentLower}-component`
        ];
        for (const variant of variants) {
            if (searchText.includes(variant)) {
                score += 8;
            }
        }
        // 标题中的组件名得分更高
        if (doc.title.toLowerCase().includes(componentLower)) {
            score += 20;
        }
        return score;
    }
    /**
     * 计算操作类型匹配得分
     */
    calculateOperationScore(doc, operationType) {
        const searchText = `${doc.title} ${doc.content}`.toLowerCase();
        const operationKeywords = {
            usage: ['用法', '使用', '怎么用', '如何使用', '怎么使用', 'usage', 'how to use'],
            api: ['api', '接口', '方法', '属性', '参数', 'props', 'methods', 'events'],
            example: ['示例', '例子', 'demo', '代码', 'example', 'sample', 'code'],
            guide: ['指南', '教程', '快速开始', '入门', 'guide', 'tutorial', 'getting started']
        };
        const keywords = operationKeywords[operationType] || [];
        let score = 0;
        for (const keyword of keywords) {
            if (searchText.includes(keyword)) {
                score += 3;
            }
        }
        return score;
    }
    /**
     * 计算模糊匹配得分
     */
    calculateFuzzyScore(doc, intent) {
        const searchText = `${doc.title} ${doc.content}`.toLowerCase();
        let score = 0;
        // 部分匹配
        for (const keyword of intent.keywords) {
            if (keyword.length > 2) {
                const partialMatches = searchText.match(new RegExp(keyword.substring(0, 3), 'g')) || [];
                score += partialMatches.length * 0.5;
            }
        }
        return score;
    }
    /**
     * 从站点地图发现文档
     */
    async discoverFromSitemap() {
        try {
            const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
            // console.log(`正在从sitemap获取文档: ${sitemapUrl}`);
            const response = await this.customFetch(sitemapUrl);
            if (!response.ok) {
                // console.log(`sitemap获取失败: HTTP ${response.status}`);
                return [];
            }
            const sitemapXml = await response.text();
            const urls = this.parseSitemapXml(sitemapXml);
            // console.log(`从sitemap解析到 ${urls.length} 个URL`);
            const documents = [];
            // 先过滤出有效的URL
            const validUrls = urls.filter(url => this.isValidDocumentUrl(url));
            // console.log(`过滤后得到 ${validUrls.length} 个有效文档URL`);
            // 批量处理文档创建，减少批量大小避免超时
            const batchSize = 5; // 减少批量大小，避免并发过多
            for (let i = 0; i < validUrls.length; i += batchSize) {
                const batch = validUrls.slice(i, i + batchSize);
                // console.log(`处理文档批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(validUrls.length/batchSize)} (${batch.length} 个文档)`);
                const batchPromises = batch.map(async (url) => {
                    try {
                        const doc = await this.createDocumentFromUrl(url);
                        return doc;
                    }
                    catch (error) {
                        console.error(`创建文档失败 ${url}:`, error);
                        // 返回一个基本的文档对象而不是null
                        return {
                            path: url,
                            title: this.getTitleFromUrl(url),
                            content: '文档内容获取失败',
                            category: this.determineCategoryFromUrl(url)
                        };
                    }
                });
                const batchResults = await Promise.all(batchPromises);
                documents.push(...batchResults.filter(doc => doc !== null));
                // 添加小延迟，避免请求过于频繁
                if (i + batchSize < validUrls.length) {
                    await new Promise(resolve => setTimeout(resolve, 200)); // 增加延迟
                }
            }
            // console.log(`从sitemap成功创建 ${documents.length} 个文档`);
            return documents;
        }
        catch (error) {
            console.error('从站点地图发现文档失败:', error);
            return [];
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
     * 验证是否为有效的文档URL
     */
    isValidDocumentUrl(url) {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            // 排除静态资源
            if (pathname.includes('/assets/') ||
                pathname.includes('.css') ||
                pathname.includes('.js') ||
                pathname.includes('.png') ||
                pathname.includes('.jpg') ||
                pathname.includes('.ico')) {
                return false;
            }
            // 排除API路径
            if (pathname.startsWith('/api/')) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * 从URL创建文档对象 - 增强版本，更好的错误处理
     */
    async createDocumentFromUrl(url) {
        try {
            // 获取文档内容
            const content = await this.getDocumentContent(url);
            // 即使内容为空也创建文档对象，避免丢失文档结构信息
            return {
                path: url,
                title: this.getTitleFromUrl(url),
                content: content || '文档内容获取失败',
                category: this.determineCategoryFromUrl(url)
            };
        }
        catch (error) {
            console.error(`创建文档失败 ${url}:`, error);
            // 返回一个基本的文档对象，而不是null
            return {
                path: url,
                title: this.getTitleFromUrl(url),
                content: '文档内容获取失败',
                category: this.determineCategoryFromUrl(url)
            };
        }
    }
    /**
     * 从URL生成标题
     */
    getTitleFromUrl(url) {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            return pathname
                .replace(/^\//, '')
                .replace(/\.html$/, '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        }
        catch (error) {
            return url;
        }
    }
    /**
     * 从URL确定文档类别
     */
    determineCategoryFromUrl(url) {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            if (pathname.includes('/frontend/')) {
                return 'frontend';
            }
            else if (pathname.includes('/backend/')) {
                return 'backend';
            }
            else {
                return 'general';
            }
        }
        catch (error) {
            return 'general';
        }
    }
    /**
     * 构建URL
     */
    buildUrl(path) {
        // 如果路径已经是完整URL，直接返回
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // 处理相对路径
        let urlPath = path;
        if (!urlPath.startsWith('/')) {
            urlPath = '/' + urlPath;
        }
        return `${this.baseUrl}${urlPath}`;
    }
    /**
     * 从HTML提取文本内容 - 改进版本，更好地提取文档内容
     */
    extractTextFromHtml(html) {
        try {
            // 移除脚本和样式
            let cleanHtml = html
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
                .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');
            // 提取主要内容区域
            const contentSelectors = [
                'main', 'article', '.content', '#content', '.main-content',
                '.documentation', '.docs-content', '.page-content',
                '.markdown-body', '.vuepress-content'
            ];
            let mainContent = '';
            for (const selector of contentSelectors) {
                const regex = new RegExp(`<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`, 'gi');
                const match = regex.exec(cleanHtml);
                if (match && match[1]) {
                    mainContent = match[1];
                    break;
                }
            }
            // 如果没有找到主要内容区域，使用整个body
            if (!mainContent) {
                const bodyMatch = cleanHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                if (bodyMatch && bodyMatch[1]) {
                    mainContent = bodyMatch[1];
                }
                else {
                    mainContent = cleanHtml;
                }
            }
            // 移除导航和侧边栏
            mainContent = mainContent
                .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
                .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
                .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
                .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
                .replace(/<div[^>]*class="[^"]*(?:nav|sidebar|menu|header|footer)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
            // 保留重要的结构化内容
            const importantTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'td', 'th', 'code', 'pre'];
            // 提取标题
            const headings = mainContent.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || [];
            const headingText = headings.map(h => h.replace(/<[^>]*>/g, '').trim()).join(' ');
            // 提取段落和列表
            const paragraphs = mainContent.match(/<p[^>]*>([^<]+)<\/p>/gi) || [];
            const paragraphText = paragraphs.map(p => p.replace(/<[^>]*>/g, '').trim()).join(' ');
            // 提取列表项
            const listItems = mainContent.match(/<li[^>]*>([^<]+)<\/li>/gi) || [];
            const listText = listItems.map(li => li.replace(/<[^>]*>/g, '').trim()).join(' ');
            // 提取代码块
            const codeBlocks = mainContent.match(/<pre[^>]*>([\s\S]*?)<\/pre>/gi) || [];
            const codeText = codeBlocks.map(code => code.replace(/<[^>]*>/g, '').trim()).join(' ');
            // 提取内联代码
            const inlineCode = mainContent.match(/<code[^>]*>([^<]+)<\/code>/gi) || [];
            const inlineCodeText = inlineCode.map(code => code.replace(/<[^>]*>/g, '').trim()).join(' ');
            // 移除所有HTML标签
            const textContent = mainContent
                .replace(/<[^>]*>/g, ' ')
                .replace(/&nbsp;/g, ' ')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\s+/g, ' ')
                .trim();
            // 组合所有内容
            const allContent = [
                headingText,
                paragraphText,
                listText,
                codeText,
                inlineCodeText,
                textContent
            ].filter(content => content.length > 0).join(' ');
            // 清理和格式化
            return allContent
                .replace(/\s+/g, ' ')
                .replace(/\n\s*\n/g, '\n')
                .trim();
        }
        catch (error) {
            console.error('HTML内容提取失败:', error);
            // 回退到简单提取
            return html
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }
    }
}
//# sourceMappingURL=RemoteDocumentService.js.map