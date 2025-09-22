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
     * 从站点地图发现文档
     */
    private discoverFromSitemap;
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
     * 智能搜索文档内容（支持大小写查询）
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
}
//# sourceMappingURL=RemoteDocumentService.d.ts.map