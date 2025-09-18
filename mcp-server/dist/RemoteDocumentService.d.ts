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
    private cacheTimeout;
    constructor(baseUrl?: string);
    getDocumentContent(path: string): Promise<Document | null>;
    listDocuments(category?: 'frontend' | 'backend' | 'all'): Promise<Document[]>;
    getDocumentStructure(): Promise<DocumentStructure>;
    getAllDocumentTexts(): Promise<Array<{
        path: string;
        title: string;
        text: string;
        category: string;
    }>>;
    private buildUrl;
    private parseHtmlContent;
    private extractTextFromHtml;
    private getTitleFromPath;
    private determineCategory;
}
//# sourceMappingURL=RemoteDocumentService.d.ts.map