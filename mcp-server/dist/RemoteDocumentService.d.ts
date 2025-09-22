export interface Document {
    path: string;
    title: string;
    content: string;
    category: 'frontend' | 'backend' | 'general';
}
export interface SearchIntent {
    originalQuery: string;
    component: string | null;
    operationType: 'usage' | 'api' | 'example' | 'guide' | 'general';
    keywords: string[];
    isComponentQuery: boolean;
}
export declare class RemoteDocumentService {
    private baseUrl;
    private documentCache;
    private contentCache;
    private documentCacheTimeout;
    private contentCacheTimeout;
    private searchCache;
    private searchCacheTimeout;
    private ignoreSSL;
    constructor(baseUrl?: string);
    /**
     * 获取文档内容
     */
    getDocumentContent(path: string): Promise<string>;
    /**
     * 自定义fetch方法，处理SSL证书问题
     */
    private customFetch;
    listDocuments(category?: 'frontend' | 'backend' | 'all'): Promise<Document[]>;
    /**
     * 智能搜索文档 - 支持自然语言查询和组件特定搜索
     */
    searchDocuments(query: string, category?: 'frontend' | 'backend' | 'all'): Promise<Document[]>;
    /**
     * 清理过期的搜索缓存
     */
    private cleanupSearchCache;
    /**
     * 解析搜索意图
     */
    private parseSearchIntent;
    /**
     * 执行智能搜索
     */
    private performIntelligentSearch;
    /**
     * 计算组件匹配得分
     */
    private calculateComponentScore;
    /**
     * 计算操作类型匹配得分
     */
    private calculateOperationScore;
    /**
     * 计算模糊匹配得分
     */
    private calculateFuzzyScore;
    /**
     * 从站点地图发现文档
     */
    private discoverFromSitemap;
    /**
     * 解析站点地图XML
     */
    private parseSitemapXml;
    /**
     * 验证sitemap中的URL是否有效
     */
    private isValidSitemapUrl;
    /**
     * 验证是否为有效的文档URL
     */
    private isValidDocumentUrl;
    /**
     * 从URL创建文档对象
     */
    private createDocumentFromUrl;
    /**
     * 从URL生成标题
     */
    private getTitleFromUrl;
    /**
     * 从URL确定文档类别
     */
    private determineCategoryFromUrl;
    /**
     * 构建URL
     */
    private buildUrl;
    /**
     * 从HTML提取文本内容 - 改进版本，更好地提取文档内容
     */
    private extractTextFromHtml;
}
//# sourceMappingURL=RemoteDocumentService.d.ts.map