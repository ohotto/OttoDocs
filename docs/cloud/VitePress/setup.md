---
title: Setup
order: 0
outline: 'deep'
---

# VitePress Setup

安装方法参考[官方文档](https://vitepress.dev/zh/)

## 配置文件

位于`.vitepress/config.mts`

```ts
export default defineConfig({
  title: "Otto's 记不住文档",
  description: "能查就不用记！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: generateSidebar(vitepressSidebarOptions),
    //导航栏设置
    nav: [
      { 
        text: 'AAA',
        items: [
          {
            items: [
              { text: 'AAA', link: '/AAA/' },
              { text: ' - aaa', link: '/AAA/aaa/' },
              { text: ' - bbb', link: '/AAA/bbb/' },
            ]
          }
        ]
      },
    ],
    //添加搜索
    search: {
      provider: 'local'
    }
  },
  //CleanURL（不显示".html"）
  cleanUrls: true
})
```

## 自动侧边栏

### 安装插件

插件地址：[https://github.com/jooy2/vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar)

```shell
# via npm
npm i -D vitepress-sidebar

# via yarn
yarn add -D vitepress-sidebar

# via pnpm
pnpm i -D vitepress-sidebar
```

### 使用方法

在`.vitepress/config.mts`中：

```ts
//导入包
import { generateSidebar } from 'vitepress-sidebar';

//配置生成参数
const vitepressSidebarOptions = [
  {
    documentRootPath: '/',                  //多目录设置的根目录
    resolvePath: '/cloud/',                 //第n个目录
    scanStartPath: 'cloud',                 //第n个目录搜索位置
    useTitleFromFrontmatter: true,          //从Frontmatter获取标题
    sortMenusByFrontmatterOrder: true,      //根据order参数确定排序
    useFolderTitleFromIndexFile: true       //从index.md获取文件夹名
  },
  {
    documentRootPath: '/',
    resolvePath: '/local/',
    scanStartPath: 'local',
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true
  },
  {
    documentRootPath: '/',
    resolvePath: '/apps/',
    scanStartPath: 'apps',
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true
  }
];

//生成侧边栏
export default defineConfig({
  // ...
  themeConfig: {
    // ...
    sidebar: generateSidebar(vitepressSidebarOptions),
  }
})

```

## 页面模板

- `.doc.md`：常规的文档页面
- `.index.md`：文件夹的默认index页面
- `.single-page.md`：单独的、不加入文件夹的页面

::: code-group

```md [.doc.md]
---
title: 显示在侧边栏中的名称
order: 排序
outline: 'deep'
---

# 显示在页面上的标题
```

```md [.index.md]
---
title: 显示在侧边栏中的名称
order: 排序
outline: 'deep'
prev: false
next: false
---

# 显示在页面上的标题
```

```md [.single-page.md]
---
title: 
outline: 'deep'
navbar: false
sidebar: false
---

```

:::