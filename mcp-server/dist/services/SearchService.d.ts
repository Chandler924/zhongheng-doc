import { DocumentService } from './DocumentService.js';
export interface SearchResult {
    path: string;
    title: string;
    excerpt: string;
    score: number;
    category: 'frontend' | 'backend' | 'general';
}
export interface SearchOptions {
    category?: 'frontend' | 'backend' | 'all';
    limit?: number;
    threshold?: number;
}
export declare class SearchService {
    private documentService;
    private fuse;
    private documents;
    constructor(documentService: DocumentService);
    initialize(): Promise<void>;
    search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
    private generateExcerpt;
    advancedSearch(queries: string[], options?: SearchOptions): Promise<SearchResult[]>;
    getRelatedDocuments(path: string, limit?: number): Promise<SearchResult[]>;
    private extractKeywords;
    private isStopWord;
}
//# sourceMappingURL=SearchService.d.ts.map