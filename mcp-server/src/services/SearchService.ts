import Fuse from 'fuse.js';
import { DocumentService, Document } from './DocumentService.js';

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
  threshold?: number; // 0.0 = 完全匹配, 1.0 = 匹配任何内容
}

export class SearchService {
  private documentService: DocumentService;
  private fuse: Fuse<any> | null = null;
  private documents: Array<{ path: string; title: string; text: string; category: string }> = [];

  constructor(documentService: DocumentService) {
    this.documentService = documentService;
  }

  async initialize(): Promise<void> {
    if (!this.fuse) {
      this.documents = await this.documentService.getAllDocumentTexts();
      
      this.fuse = new Fuse(this.documents, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'text', weight: 0.3 },
        ],
        includeScore: true,
        includeMatches: true,
        threshold: 0.4, // 默认阈值
        minMatchCharLength: 2,
        ignoreLocation: true,
        findAllMatches: true,
      });
    }
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    await this.initialize();

    if (!this.fuse) {
      throw new Error('搜索服务未初始化');
    }

    const {
      category = 'all',
      limit = 10,
      threshold = 0.4,
    } = options;

    // 设置搜索阈值
    this.fuse.setCollection(this.documents);

    // 执行搜索
    const results = this.fuse.search(query, {
      limit: limit * 2, // 获取更多结果以便过滤
    });

    // 过滤结果
    let filteredResults = results;
    if (category !== 'all') {
      filteredResults = results.filter(result => result.item.category === category);
    }

    // 应用阈值过滤
    filteredResults = filteredResults.filter(result => 
      result.score !== undefined && result.score <= threshold
    );

    // 限制结果数量
    filteredResults = filteredResults.slice(0, limit);

    // 转换为SearchResult格式
    return filteredResults.map(result => {
      const item = result.item;
      const matches = result.matches || [];
      
      // 生成摘要
      const excerpt = this.generateExcerpt(item.text, [...matches], query);
      
      return {
        path: item.path,
        title: item.title,
        excerpt,
        score: result.score || 0,
        category: item.category as 'frontend' | 'backend' | 'general',
      };
    });
  }

  private generateExcerpt(
    text: string,
    matches: any[],
    query: string
  ): string {
    // 移除HTML标签
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // 查找匹配的文本片段
    let bestMatch = '';
    let bestScore = Infinity;

    for (const match of matches) {
      if (match.key === 'text' && match.indices) {
        const start = Math.max(0, match.indices[0][0] - 50);
        const end = Math.min(cleanText.length, match.indices[match.indices.length - 1][1] + 50);
        const excerpt = cleanText.substring(start, end);
        
        // 计算相关性分数（基于匹配位置和长度）
        const score = Math.abs(match.indices[0][0] - start) + 
                     Math.abs(end - match.indices[match.indices.length - 1][1]);
        
        if (score < bestScore) {
          bestScore = score;
          bestMatch = excerpt;
        }
      }
    }

    // 如果没有找到匹配，尝试简单的文本搜索
    if (!bestMatch) {
      const queryLower = query.toLowerCase();
      const textLower = cleanText.toLowerCase();
      const index = textLower.indexOf(queryLower);
      
      if (index !== -1) {
        const start = Math.max(0, index - 100);
        const end = Math.min(cleanText.length, index + query.length + 100);
        bestMatch = cleanText.substring(start, end);
      }
    }

    // 如果仍然没有找到，返回文本的开头部分
    if (!bestMatch) {
      bestMatch = cleanText.substring(0, 200);
    }

    // 清理和格式化摘要
    bestMatch = bestMatch
      .replace(/\s+/g, ' ')
      .trim();

    // 添加省略号
    if (bestMatch.length > 200) {
      bestMatch = bestMatch.substring(0, 200) + '...';
    }

    return bestMatch;
  }

  // 高级搜索：支持多个查询词
  async advancedSearch(
    queries: string[],
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const allResults: SearchResult[] = [];
    const seenPaths = new Set<string>();

    for (const query of queries) {
      const results = await this.search(query, {
        ...options,
        limit: options.limit || 10,
      });

      for (const result of results) {
        if (!seenPaths.has(result.path)) {
          seenPaths.add(result.path);
          allResults.push(result);
        }
      }
    }

    // 按分数排序
    allResults.sort((a, b) => a.score - b.score);

    return allResults.slice(0, options.limit || 10);
  }

  // 获取相关文档
  async getRelatedDocuments(
    path: string,
    limit: number = 5
  ): Promise<SearchResult[]> {
    const document = await this.documentService.getDocumentContent(path);
    if (!document) {
      return [];
    }

    // 从文档标题和内容中提取关键词
    const keywords = this.extractKeywords(document.title + ' ' + document.content);
    
    // 搜索相关文档
    const results = await this.advancedSearch(keywords, {
      category: 'all',
      limit: limit + 1, // +1 因为可能包含自己
    });

    // 过滤掉当前文档
    return results.filter(result => result.path !== path).slice(0, limit);
  }

  private extractKeywords(text: string): string[] {
    // 简单的关键词提取
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !this.isStopWord(word));

    // 统计词频
    const wordCount = new Map<string, number>();
    for (const word of words) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    // 返回最常见的词
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }

  private isStopWord(word: string): boolean {
    const stopWords = new Set([
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
      'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these',
      'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
      'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
      'must', 'can', 'shall', 'a', 'an', 'the'
    ]);
    return stopWords.has(word);
  }
}
