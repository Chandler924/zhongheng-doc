export interface Document {
    path: string;
    title: string;
    content: string;
    frontmatter: Record<string, any>;
    lastModified: Date;
    category: 'frontend' | 'backend' | 'general';
}
export interface DocumentStructure {
    frontend: DocumentNode[];
    backend: DocumentNode[];
    general: DocumentNode[];
}
export interface DocumentNode {
    title: string;
    path: string;
    children?: DocumentNode[];
}
export declare class RemoteDocumentService {
    private baseUrl;
    private cache;
    private documentCache;
    private cacheTimeout;
    private documentCacheTimeout;
    constructor(baseUrl?: string);
    getDocumentContent(path: string): Promise<Document | null>;
    listDocuments(category?: 'frontend' | 'backend' | 'all'): Promise<Document[]>;
    /**
     * 动态发现所有文档
     */
    private discoverDocuments;
    /**
     * 从站点地图发现文档
     */
    private discoverFromSitemap;
    /**
     * 通过爬取页面链接发现文档
     */
    private discoverFromCrawling;
    /**
     * 基于常见路径模式发现文档
     */
    private discoverFromCommonPatterns;
    /**
     * 发现组件文档路径
     */
    private discoverComponentPaths;
    /**
     * 获取基本文档列表（降级方案）
     */
    private getBasicDocuments;
    getDocumentStructure(): Promise<DocumentStructure>;
    getAllDocumentTexts(): Promise<Array<{
        path: string;
        title: string;
        text: string;
        category: string;
    }>>;
    /**
     * 测试sitemap功能
     */
    testSitemap(): Promise<{
        success: boolean;
        urlCount: number;
        documentCount: number;
        error?: string;
    }>;
    /**
     * 智能搜索文档内容
     */
    searchDocuments(query: string, category?: 'frontend' | 'backend' | 'all', limit?: number): Promise<Array<{
        path: string;
        title: string;
        excerpt: string;
        score: number;
        category: string;
    }>>;
    /**
     * 生成文档摘要
     */
    private generateExcerpt;
    private buildUrl;
    private parseHtmlContent;
    private extractTextFromHtml;
    private getTitleFromPath;
    private determineCategory;
    /**
     * 解析站点地图XML
     */
    private parseSitemapXml;
    /**
     * 验证sitemap中的URL是否有效
     */
    private isValidSitemapUrl;
    /**
     * 从URL提取路径
     */
    private extractPathFromUrl;
    /**
     * 验证是否为有效的文档路径
     */
    private isValidDocumentPath;
    /**
     * 从路径创建文档对象
     */
    private createDocumentFromPath;
    /**
     * 从HTML中提取链接
     */
    private extractLinksFromHtml;
}
//# sourceMappingURL=RemoteDocumentService.d.ts.map