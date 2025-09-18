import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: '纵横框架文档',
  description: '纵横前端和后端框架的完整文档',

  // 基础路径配置（用于GitHub Pages部署）
  base: '/zhongheng-doc/',

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
            text: '组件库',
            link: '/frontend/components/',
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
              text: '组件库',
              children: [
                '/frontend/components/',
                '/frontend/components/z-file-uploader',
                '/frontend/components/z-page-card',
              ],
            },
            {
              text: '开发指南',
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
    // 可以在这里添加更多插件
  ],
})
