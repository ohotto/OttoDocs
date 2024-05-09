---
title: Deploy to GitHub
order: 0.5
outline: 'deep'
---

# 部署到 GitHub

## 创建本地仓库

在VitrPress项目根目录：

```sh
git init
```

## 创建.gitignore

在VitrPress项目根目录创建`.gitignore`

```
.vitepress/cache
.vitepress/dist
```

## 创建gh-page部署工作流

创建`.github\workflows\deploy.yml`

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 提交一次

```sh
git add .
git commit -m "first commit"
```

## 创建远端仓库

在GitHub新建repo

假设用ssh连接，git bash：

```sh
# 第一次需要配置ssh
eval $(ssh-agent -s)
ssh-add ~/.ssh/github
# 连接远端仓库，并进行第一次push
git remote add origin git@github.com:ohotto/OttoDocs.git
git branch -M main
git push -u origin main
```

## 检查GitHub Pages的部署情况

打开仓库 `Setting` - `Build and deployment`，把 `Source` 设置为 `GitHub Actions`

然后再进行一次push，就会触发部署

打开仓库`Actions` 查看部署情况


## 以后的修改方法

```sh
# 在本地进行修改，然后commit到本地仓库
git add .
git commit -m "commit description"
# push到远端仓库
git push
```

