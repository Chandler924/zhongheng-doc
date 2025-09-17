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
export declare class DocumentService {
    private docsRoot;
    private md;
    constructor(docsRoot: string);
    getDocumentContent(path: string): Promise<Document | null>;
    listDocuments(category?: 'frontend' | 'backend' | 'all'): Promise<Document[]>;
    getDocumentStructure(): Promise<DocumentStructure>;
    private scanDirectory;
    private buildTree;
    private extractTitle;
    private determineCategory;
    private getTitleFromPath;
    getAllDocumentTexts(): Promise<Array<{
        path: string;
        title: string;
        text: string;
        category: string;
    }>>;
}
//# sourceMappingURL=DocumentService.d.ts.map