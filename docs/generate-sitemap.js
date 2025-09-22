const fs = require('fs');
const path = require('path');

// 站点配置
const siteConfig = {
  hostname: 'https://moli2.zt.com.cn',
  base: '/zongheng-doc/',
  changefreq: 'weekly',
  priority: 0.5
};

// 获取所有HTML文件
function getAllHtmlFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath, path.join(basePath, item)));
    } else if (item.endsWith('.html') && item !== '404.html') {
      const relativePath = path.join(basePath, item).replace(/\\/g, '/');
      const urlPath = relativePath === 'index.html' ? '/index.html' : '/' + relativePath;
      files.push(urlPath);
    }
  }
  
  return files;
}

// 生成sitemap.xml
function generateSitemap() {
  const distDir = path.join(__dirname, '.vuepress', 'dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('构建目录不存在，请先运行 npm run docs:build');
    return;
  }
  
  const htmlFiles = getAllHtmlFiles(distDir);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${htmlFiles.map(file => {
  const fullUrl = siteConfig.hostname + siteConfig.base + file.replace(/^\//, '');
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${siteConfig.changefreq}</changefreq>
    <priority>${siteConfig.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log(`✅ Sitemap已生成: ${sitemapPath}`);
  console.log(`📄 包含 ${htmlFiles.length} 个页面`);
  console.log(`🌐 基础URL: ${siteConfig.hostname}${siteConfig.base}`);
}

// 运行生成
generateSitemap();
