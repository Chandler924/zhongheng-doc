import { readFile, readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
export class DocumentService {
    docsRoot;
    md;
    constructor(docsRoot) {
        this.docsRoot = docsRoot;
        this.md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
        });
    }
    async getDocumentContent(path) {
        try {
            // 确保路径以 .md 结尾
            const filePath = path.endsWith('.md') ? path : `${path}.md`;
            const fullPath = join(this.docsRoot, filePath);
            const content = await readFile(fullPath, 'utf-8');
            const stats = await stat(fullPath);
            const { data: frontmatter, content: markdownContent } = matter(content);
            // 从内容中提取标题（如果没有在frontmatter中定义）
            const title = frontmatter.title || this.extractTitle(markdownContent);
            // 确定文档类别
            const category = this.determineCategory(path);
            return {
                path,
                title,
                content: markdownContent,
                frontmatter,
                lastModified: stats.mtime,
                category,
            };
        }
        catch (error) {
            console.error(`读取文档失败 ${path}:`, error);
            return null;
        }
    }
    async listDocuments(category = 'all') {
        const documents = [];
        try {
            await this.scanDirectory(this.docsRoot, documents, '');
            if (category === 'all') {
                return documents;
            }
            return documents.filter(doc => doc.category === category);
        }
        catch (error) {
            console.error('扫描文档目录失败:', error);
            return [];
        }
    }
    async getDocumentStructure() {
        const structure = {
            frontend: [],
            backend: [],
            general: [],
        };
        try {
            const documents = await this.listDocuments();
            // 构建层级结构
            const frontendDocs = documents.filter(doc => doc.category === 'frontend');
            const backendDocs = documents.filter(doc => doc.category === 'backend');
            const generalDocs = documents.filter(doc => doc.category === 'general');
            structure.frontend = this.buildTree(frontendDocs);
            structure.backend = this.buildTree(backendDocs);
            structure.general = this.buildTree(generalDocs);
            return structure;
        }
        catch (error) {
            console.error('构建文档结构失败:', error);
            return structure;
        }
    }
    async scanDirectory(dirPath, documents, relativePath) {
        try {
            const entries = await readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = join(dirPath, entry.name);
                const entryRelativePath = relativePath ? join(relativePath, entry.name) : entry.name;
                if (entry.isDirectory()) {
                    // 跳过 .vuepress 目录
                    if (entry.name === '.vuepress') {
                        continue;
                    }
                    await this.scanDirectory(fullPath, documents, entryRelativePath);
                }
                else if (entry.isFile() && extname(entry.name) === '.md') {
                    const doc = await this.getDocumentContent(entryRelativePath);
                    if (doc) {
                        documents.push(doc);
                    }
                }
            }
        }
        catch (error) {
            console.error(`扫描目录失败 ${dirPath}:`, error);
        }
    }
    buildTree(documents) {
        const tree = [];
        const pathMap = new Map();
        // 按路径排序
        documents.sort((a, b) => a.path.localeCompare(b.path));
        for (const doc of documents) {
            const pathParts = doc.path.split('/').filter(part => part && part !== 'index.md');
            let currentPath = '';
            let parent = tree;
            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];
                currentPath = currentPath ? `${currentPath}/${part}` : part;
                let node = pathMap.get(currentPath);
                if (!node) {
                    node = {
                        title: this.getTitleFromPath(part),
                        path: currentPath,
                        children: [],
                    };
                    pathMap.set(currentPath, node);
                    parent.push(node);
                }
                if (i === pathParts.length - 1) {
                    // 这是文档节点
                    node.title = doc.title;
                    node.path = doc.path;
                }
                else {
                    // 这是目录节点
                    parent = node.children || [];
                }
            }
        }
        return tree;
    }
    extractTitle(content) {
        // 尝试从第一个标题提取
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            return titleMatch[1].trim();
        }
        // 如果没有找到标题，使用文件名
        return 'Untitled';
    }
    determineCategory(path) {
        if (path.startsWith('frontend/')) {
            return 'frontend';
        }
        else if (path.startsWith('backend/')) {
            return 'backend';
        }
        else {
            return 'general';
        }
    }
    getTitleFromPath(path) {
        // 将路径转换为标题
        return path
            .replace(/\.md$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    // 获取所有文档的文本内容用于搜索
    async getAllDocumentTexts() {
        const documents = await this.listDocuments();
        return documents.map(doc => ({
            path: doc.path,
            title: doc.title,
            text: this.md.render(doc.content),
            category: doc.category,
        }));
    }
}
//# sourceMappingURL=DocumentService.js.map