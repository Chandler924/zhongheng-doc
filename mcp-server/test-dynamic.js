#!/usr/bin/env node

// 测试动态文档发现功能
import { RemoteDocumentService } from './src/RemoteDocumentService.js';

async function testDynamicDiscovery() {
  console.log('🚀 开始测试动态文档发现功能...\n');
  
  const service = new RemoteDocumentService('https://chandler924.github.io/zhongheng-doc');
  
  try {
    // 测试1: 获取站点信息
    console.log('📋 测试1: 获取站点信息');
    const siteInfo = await service.getSiteInfo();
    console.log('站点信息:', JSON.stringify(siteInfo, null, 2));
    console.log('');
    
    // 测试2: 动态发现文档
    console.log('🔍 测试2: 动态发现所有文档');
    const allDocs = await service.listDocuments('all');
    console.log(`发现 ${allDocs.length} 个文档:`);
    allDocs.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title} (${doc.path}) - ${doc.category}`);
    });
    console.log('');
    
    // 测试3: 按类别过滤
    console.log('📂 测试3: 前端文档');
    const frontendDocs = await service.listDocuments('frontend');
    console.log(`发现 ${frontendDocs.length} 个前端文档:`);
    frontendDocs.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title} (${doc.path})`);
    });
    console.log('');
    
    // 测试4: 智能搜索
    console.log('🔎 测试4: 智能搜索 "按钮"');
    const searchResults = await service.searchDocuments('按钮', 'frontend', 5);
    console.log(`找到 ${searchResults.length} 个相关文档:`);
    searchResults.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.title} (${result.path})`);
      console.log(`     摘要: ${result.excerpt}`);
      console.log(`     分数: ${result.score}`);
    });
    console.log('');
    
    // 测试5: 获取具体文档内容
    if (frontendDocs.length > 0) {
      console.log('📄 测试5: 获取文档内容');
      const firstDoc = frontendDocs[0];
      const content = await service.getDocumentContent(firstDoc.path);
      if (content) {
        console.log(`文档: ${content.title}`);
        console.log(`路径: ${content.path}`);
        console.log(`类别: ${content.category}`);
        console.log(`内容长度: ${content.content.length} 字符`);
        console.log(`文本摘要: ${service.extractTextFromHtml(content.content).substring(0, 200)}...`);
      }
    }
    
    console.log('\n✅ 动态文档发现功能测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testDynamicDiscovery().catch(console.error);
