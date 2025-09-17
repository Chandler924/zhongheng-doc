# 部署指南

本指南将帮助你部署纵横框架应用到各种平台。

## GitHub Pages 部署

### 1. 配置 GitHub Actions

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build docs
      run: npm run docs:build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/.vuepress/dist
```

### 2. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 "Settings" 标签
3. 滚动到 "Pages" 部分
4. 在 "Source" 下选择 "GitHub Actions"
5. 保存设置

### 3. 推送代码

```bash
git add .
git commit -m "Add documentation"
git push origin main
```

部署完成后，你的文档将在 `https://your-username.github.io/zongheng-mcp/` 访问。

## Vercel 部署

### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

### 2. 创建 vercel.json 配置

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vuepress/dist",
  "framework": null,
  "installCommand": "npm install"
}
```

### 3. 部署

```bash
vercel --prod
```

## Netlify 部署

### 1. 创建 netlify.toml 配置

```toml
[build]
  command = "npm run docs:build"
  publish = "docs/.vuepress/dist"

[build.environment]
  NODE_VERSION = "18"
```

### 2. 连接 GitHub 仓库

1. 登录 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择你的 GitHub 仓库
4. 配置构建设置：
   - Build command: `npm run docs:build`
   - Publish directory: `docs/.vuepress/dist`
5. 点击 "Deploy site"

## Docker 部署

### 1. 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run docs:build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/docs/.vuepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建 nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. 构建和运行

```bash
# 构建镜像
docker build -t zongheng-docs .

# 运行容器
docker run -p 80:80 zongheng-docs
```

## 环境变量配置

### 开发环境

```env
# .env.development
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=纵横框架文档
```

### 生产环境

```env
# .env.production
NODE_ENV=production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_TITLE=纵横框架文档
```

## 性能优化

### 1. 静态资源优化

```javascript
// docs/.vuepress/config.js
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['vue', 'vue-router'],
              utils: ['lodash', 'dayjs']
            }
          }
        }
      }
    }
  })
})
```

### 2. 图片优化

```javascript
// 使用 WebP 格式
export default defineUserConfig({
  plugins: [
    ['@vuepress/plugin-shiki', {
      theme: 'github-light'
    }]
  ]
})
```

### 3. 缓存策略

```javascript
// 配置缓存头
export default defineUserConfig({
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }]
  ]
})
```

## 监控和日志

### 1. 错误监控

```javascript
// 添加错误监控
export default defineUserConfig({
  plugins: [
    ['@vuepress/plugin-google-analytics', {
      id: 'GA_MEASUREMENT_ID'
    }]
  ]
})
```

### 2. 性能监控

```javascript
// 添加性能监控
export default defineUserConfig({
  head: [
    ['script', {
      src: 'https://cdn.jsdelivr.net/npm/web-vitals@3/dist/web-vitals.attribution.js',
      defer: true
    }]
  ]
})
```

## 安全配置

### 1. HTTPS 配置

```javascript
// 强制 HTTPS
export default defineUserConfig({
  head: [
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }]
  ]
})
```

### 2. 内容安全策略

```javascript
// CSP 配置
export default defineUserConfig({
  head: [
    ['meta', {
      'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    }]
  ]
})
```

## 备份策略

### 1. 自动备份

```yaml
# .github/workflows/backup.yml
name: Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
    - name: Backup to S3
      run: |
        # 备份脚本
        aws s3 sync ./docs s3://your-backup-bucket/docs
```

### 2. 版本控制

```bash
# 创建备份分支
git checkout -b backup-$(date +%Y%m%d)
git add .
git commit -m "Backup $(date)"
git push origin backup-$(date +%Y%m%d)
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清理 node_modules 重新安装
   - 检查依赖版本兼容性

2. **部署后页面空白**
   - 检查 base 路径配置
   - 确认静态资源路径正确
   - 查看浏览器控制台错误

3. **路由404错误**
   - 配置服务器重写规则
   - 检查 Vue Router 配置
   - 确认 SPA 模式设置

### 调试技巧

```bash
# 本地预览构建结果
npm run docs:build
npx serve docs/.vuepress/dist

# 检查构建产物
ls -la docs/.vuepress/dist

# 查看构建日志
npm run docs:build -- --debug
```
