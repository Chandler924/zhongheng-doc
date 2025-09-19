#!/usr/bin/env node

// 简单测试动态文档发现功能
async function testDynamicDiscovery() {
  console.log('🚀 开始测试动态文档发现功能...\n');
  
  const baseUrl = 'https://chandler924.github.io/zhongheng-doc';
  
  try {
    // 测试1: 尝试从站点地图获取
    console.log('📋 测试1: 尝试从站点地图获取文档');
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const response = await fetch(sitemapUrl);
    
    if (response.ok) {
      const sitemapXml = await response.text();
      console.log('✅ 站点地图获取成功');
      console.log('站点地图内容长度:', sitemapXml.length);
      
      // 解析URL
      const urlRegex = /<loc>(.*?)<\/loc>/g;
      const urls = [];
      let match;
      
      while ((match = urlRegex.exec(sitemapXml)) !== null) {
        urls.push(match[1]);
      }
      
      console.log(`发现 ${urls.length} 个URL:`);
      urls.slice(0, 10).forEach((url, index) => {
        console.log(`  ${index + 1}. ${url}`);
      });
      if (urls.length > 10) {
        console.log(`  ... 还有 ${urls.length - 10} 个URL`);
      }
    } else {
      console.log('❌ 站点地图获取失败:', response.status, response.statusText);
    }
    console.log('');
    
    // 测试2: 尝试访问首页
    console.log('🏠 测试2: 访问首页');
    const homeResponse = await fetch(`${baseUrl}/index.html`);
    
    if (homeResponse.ok) {
      const homeHtml = await homeResponse.text();
      console.log('✅ 首页访问成功');
      console.log('首页内容长度:', homeHtml.length);
      
      // 提取链接
      const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
      const links = [];
      let match;
      
      while ((match = linkRegex.exec(homeHtml)) !== null) {
        const href = match[1];
        if (href.startsWith('/') && !href.includes('/assets/')) {
          const path = href.replace('/zhongheng-doc', '') || '/';
          links.push(path);
        }
      }
      
      console.log(`发现 ${links.length} 个内部链接:`);
      links.slice(0, 10).forEach((link, index) => {
        console.log(`  ${index + 1}. ${link}`);
      });
      if (links.length > 10) {
        console.log(`  ... 还有 ${links.length - 10} 个链接`);
      }
    } else {
      console.log('❌ 首页访问失败:', homeResponse.status, homeResponse.statusText);
    }
    console.log('');
    
    // 测试3: 尝试访问组件页面
    console.log('🧩 测试3: 访问组件页面');
    const componentUrls = [
      `${baseUrl}/frontend/components/mobile/index.html`,
      `${baseUrl}/frontend/components/pc/index.html`
    ];
    
    for (const url of componentUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const html = await response.text();
          console.log(`✅ ${url} 访问成功`);
          
          // 提取组件链接
          const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
          const componentLinks = [];
          let match;
          
          while ((match = linkRegex.exec(html)) !== null) {
            const href = match[1];
            if (href.includes('/frontend/components/') && href !== url.replace(baseUrl, '')) {
              const path = href.replace('/zhongheng-doc', '') || '/';
              componentLinks.push(path);
            }
          }
          
          console.log(`  发现 ${componentLinks.length} 个组件链接:`);
          componentLinks.slice(0, 5).forEach((link, index) => {
            console.log(`    ${index + 1}. ${link}`);
          });
          if (componentLinks.length > 5) {
            console.log(`    ... 还有 ${componentLinks.length - 5} 个组件`);
          }
        } else {
          console.log(`❌ ${url} 访问失败:`, response.status, response.statusText);
        }
      } catch (error) {
        console.log(`❌ ${url} 访问出错:`, error.message);
      }
    }
    
    console.log('\n✅ 动态文档发现功能测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

// 运行测试
testDynamicDiscovery().catch(console.error);
