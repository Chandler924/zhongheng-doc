#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 检查路径是否存在且为文件
 */
function isFile(filePath) {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    return fs.statSync(fullPath).isFile();
  } catch (error) {
    return false;
  }
}

/**
 * 检查路径是否存在且为目录
 */
function isDirectory(dirPath) {
  try {
    const fullPath = path.resolve(__dirname, dirPath);
    return fs.statSync(fullPath).isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * 检查是否存在index.md文件（用于目录链接）
 */
function hasIndexMd(dirPath) {
  const indexPath = path.join(dirPath, 'index.md');
  return isFile(indexPath);
}

/**
 * 修正README.md中的链接
 */
function fixReadmeLinks() {
  const readmePath = path.join(__dirname, 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.log('❌ README.md 文件不存在');
    return;
  }

  let content = fs.readFileSync(readmePath, 'utf8');
  let modified = false;

  // 匹配Markdown链接格式 [text](path)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  content = content.replace(linkRegex, (match, text, linkPath) => {
    // 跳过外部链接（以http开头）
    if (linkPath.startsWith('http')) {
      return match;
    }

    // 跳过已经是.html的链接
    if (linkPath.endsWith('.html')) {
      return match;
    }

    // 跳过LICENSE等特殊文件
    if (linkPath === 'LICENSE') {
      return match;
    }

    // 检查是否为具体的.md文件
    const mdPath = linkPath.endsWith('.md') ? linkPath : linkPath + '.md';
    const htmlPath = linkPath.endsWith('.md') ? linkPath.replace('.md', '.html') : linkPath + '.html';

    if (isFile(mdPath)) {
      // 如果是具体的.md文件，修改为.html
      console.log(`📝 修正链接: ${linkPath} → ${htmlPath} (检测到.md文件)`);
      modified = true;
      return `[${text}](${htmlPath})`;
    } else if (isDirectory(linkPath)) {
      // 如果是目录，检查是否有index.md
      if (hasIndexMd(linkPath)) {
        console.log(`📁 保持目录链接: ${linkPath} (包含index.md)`);
      } else {
        console.log(`📁 保持目录链接: ${linkPath} (目录)`);
      }
      return match;
    } else {
      // 如果既不是文件也不是目录，尝试添加.html
      console.log(`⚠️  未知路径，尝试添加.html: ${linkPath} → ${htmlPath}`);
      modified = true;
      return `[${text}](${htmlPath})`;
    }
  });

  if (modified) {
    fs.writeFileSync(readmePath, content, 'utf8');
    console.log('✅ README.md 链接修正完成');
  } else {
    console.log('✅ README.md 链接无需修正');
  }
}

// 执行修正
console.log('🔍 开始检查README.md中的链接...');
fixReadmeLinks();
console.log('🎉 链接检查完成');
