//config.mts
import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';


const vitepressSidebarOptions = [
  {
    documentRootPath: '/docs',
    scanStartPath: 'cloud',
    resolvePath: '/cloud/',
    useTitleFromFrontmatter: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'local',
    resolvePath: '/local/',
    useTitleFromFrontmatter: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'apps',
    resolvePath: '/apps/',
    useTitleFromFrontmatter: true,
    hyphenToSpace: true,
    underscoreToSpace: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true
  }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './docs',
  title: "Otto's 记不住文档",
  description: "能查就不用记！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: generateSidebar(vitepressSidebarOptions),
    nav: [
      { text: '云端实践', link: '/cloud/VPS/scripts' },
      { text: '本地实践', link: '/local/env/git' },
      { text: '软件技巧', link: '/apps/web/bing' }
    ],
    // nav: [
    //   { 
    //     text: '云端实践',
    //     items: [
    //       {
    //         items: [
    //           { text: '云端实践☁️', link: '/cloud/' },
    //           { text: ' - VPS相关', link: '/cloud/VPS/' },
    //           { text: ' - VitePress', link: '/cloud/VitePress/' },
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     text: '本地实践',
    //     items: [
    //       {
    //         items: [
    //           { text: '本地实践🏠', link: '/local/' },
    //           { text: ' - 环境搭建', link: '/local/env/' },
    //           { text: ' - 开发板卡', link: '/local/cards/' },
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     text: '软件技巧',
    //     items: [
    //       {
    //         items: [
    //           { text: '软件技巧💻', link: '/apps/' },
    //           { text: ' - AI应用', link: '/apps/ai/' },
    //           { text: ' - 学习相关', link: '/apps/study/' },
    //         ]
    //       }
    //     ]
    //   }
    // ],
    search: {
      provider: 'local'
    }
  },
  cleanUrls: true,
  markdown: {
    math: true
  }
})
