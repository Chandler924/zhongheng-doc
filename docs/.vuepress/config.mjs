import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: '纵横框架文档',
  description: '纵横前端和后端框架的完整文档',

  // 基础路径配置（用于GitHub Pages部署）
  base: '/zongheng-doc/',


  // 主题配置
  theme: defaultTheme({
    // 导航栏配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端框架',
        children: [
          {
            text: '快速开始',
            link: '/frontend/guides/getting-started',
          },
          {
            text: 'PC端组件',
            link: '/frontend/components/pc/',
          },
          {
            text: '移动端组件',
            link: '/frontend/components/mobile/',
          },
          {
            text: '开发指南',
            link: '/frontend/guides/state-management',
          },
          {
            text: '架构设计',
            link: '/frontend/architecture/overview',
          },
        ],
      },
      {
        text: '后端框架',
        children: [
          {
            text: '快速开始',
            link: '/backend/getting-started',
          },
          {
            text: 'API设计',
            link: '/backend/api-design',
          },
          {
            text: '数据库',
            link: '/backend/database',
          },
          {
            text: '中间件',
            link: '/backend/middleware',
          },
        ],
      },
      {
        text: '部署指南',
        link: '/deployment',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Chandler924/zhongheng-doc',
      },
    ],

    // 侧边栏配置
    sidebar: {
      '/frontend/': [
        {
          text: '前端框架',
          children: [
            {
              text: '快速开始',
              link: '/frontend/guides/getting-started',
            },
            {
              text: 'PC端组件',
              link: '/frontend/components/pc/',
              collapsible: true,
              children: [
                '/frontend/components/pc/z-app-icons',
                '/frontend/components/pc/z-business-line',
                '/frontend/components/pc/z-buttons',
                '/frontend/components/pc/z-checkbox',
                '/frontend/components/pc/z-color-picker',
                '/frontend/components/pc/z-conditions',
                '/frontend/components/pc/z-date-time',
                '/frontend/components/pc/z-dialog',
                '/frontend/components/pc/z-email',
                '/frontend/components/pc/z-file-uploader',
                '/frontend/components/pc/z-helper',
                '/frontend/components/pc/z-icon',
                '/frontend/components/pc/z-idcard',
                '/frontend/components/pc/z-image-uploader',
                '/frontend/components/pc/z-img-preview',
                '/frontend/components/pc/z-inputs',
                '/frontend/components/pc/z-job',
                '/frontend/components/pc/z-loading',
                '/frontend/components/pc/z-operate-button',
                '/frontend/components/pc/z-page-card',
                '/frontend/components/pc/z-radio',
                '/frontend/components/pc/z-rank',
                '/frontend/components/pc/z-router-view',
                '/frontend/components/pc/z-select',
                '/frontend/components/pc/z-select-application',
                '/frontend/components/pc/z-select-connector-api',
                '/frontend/components/pc/z-select-dict-code',
                '/frontend/components/pc/z-select-role',
                '/frontend/components/pc/z-select-unit',
                '/frontend/components/pc/z-select-user',
                '/frontend/components/pc/z-switch',
                '/frontend/components/pc/z-text',
                '/frontend/components/pc/z-title',
                '/frontend/components/pc/z-user-unit-role-authority',
              ],
            },
            {
              text: '移动端组件',
              link: '/frontend/components/mobile/',
              collapsible: true,
              children: [
                '/frontend/components/mobile/v-add-button',
                '/frontend/components/mobile/v-app-icon',
                '/frontend/components/mobile/v-app-panel',
                '/frontend/components/mobile/v-app-title-bar',
                '/frontend/components/mobile/v-back-button',
                '/frontend/components/mobile/v-batch-delete-button',
                '/frontend/components/mobile/v-cancel-button',
                '/frontend/components/mobile/v-check-role',
                '/frontend/components/mobile/v-check-unit',
                '/frontend/components/mobile/v-check-user',
                '/frontend/components/mobile/v-checkbox',
                '/frontend/components/mobile/v-clear-button',
                '/frontend/components/mobile/v-date',
                '/frontend/components/mobile/v-description',
                '/frontend/components/mobile/v-district',
                '/frontend/components/mobile/v-email',
                '/frontend/components/mobile/v-export-button',
                '/frontend/components/mobile/v-file-upload',
                '/frontend/components/mobile/v-idcard',
                '/frontend/components/mobile/v-image-upload',
                '/frontend/components/mobile/v-import-button',
                '/frontend/components/mobile/v-input',
                '/frontend/components/mobile/v-money',
                '/frontend/components/mobile/v-number',
                '/frontend/components/mobile/v-ok-button',
                '/frontend/components/mobile/v-page-card',
                '/frontend/components/mobile/v-phone',
                '/frontend/components/mobile/v-radio',
                '/frontend/components/mobile/v-reset-button',
                '/frontend/components/mobile/v-search-button',
                '/frontend/components/mobile/v-select',
                '/frontend/components/mobile/v-select-checkbox',
                '/frontend/components/mobile/v-select-dict-code',
                '/frontend/components/mobile/v-select-dict-list',
                '/frontend/components/mobile/v-textarea',
              ],
            },
            {
              text: '开发指南',
              link: '/frontend/guides/state-management',
              children: [
                '/frontend/guides/state-management',
                '/frontend/guides/routing',
              ],
            },
            {
              text: '架构设计',
              children: [
                '/frontend/architecture/overview',
              ],
            },
          ],
        },
      ],
      '/backend/': [
        {
          text: '后端框架',
          children: [
            '/backend/getting-started',
            '/backend/api-design',
            '/backend/database',
            '/backend/middleware',
          ],
        },
      ],
    },

    // 编辑链接
    editLink: false,
    
    // 最后更新时间
    lastUpdated: true,
    
    // 贡献者
    contributors: false,
  }),

  // 打包工具配置
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  // 插件配置
  plugins: [
    [
      '@vuepress/plugin-sitemap',
      {
        hostname: 'https://moli2.zt.com.cn',
        base: '/zongheng-doc/',
        changefreq: 'weekly',
        priority: 0.5,
        exclude: ['/404.html']
      }
    ]
  ],

  // Markdown配置
  markdown: {
    // 启用链接检查
    linkify: true,
    // 自动转换链接
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  },

  // 链接配置
  locales: {
    '/': {
      // 内部链接配置
      internalLinkRegex: /^\/[^\/]/,
    }
  },
})
