---
title: Zotero
order: -1
outline: 'deep'
---

# Zotero 必备配置

Zotero 是一款免费的参考文献管理软件，它可以帮助用户收集、整理和引用文献。本文将介绍 Zotero 的配置教程，帮助用户更好地使用 Zotero。

## 下载并安装 Zotero

首先，需要前往 Zotero 官网（[https://www.zotero.org/download/](https://www.zotero.org/download/)）下载最新版本的 Zotero 软件。Zotero 适用于 Windows、Mac 和 Linux 等操作系统，用户可以根据自己的操作系统进行下载。

下载 Zotero 后，您需要安装它。在安装过程中，您将被提示选择要安装的浏览器插件。选择与您使用的浏览器相对应的插件。

安装后，Zotero 将自动打开 [https://www.zotero.org/start](https://www.zotero.org/start) 来指导浏览器插件的安装。

## 登录 Zotero 账号

打开 Zotero 软件，在菜单栏中选择“编辑”->“首选项”->“同步”，输入 Zotero 账号的邮箱和密码，然后点击“启用同步”按钮，完成登录。

## 使用坚果云同步 Zotero

打开 Zotero 软件，在菜单栏中选择“编辑”->“首选项”->“同步”，将同步方式选择为 WebDAV，并填入坚果云 WebDAV 的链接信息和文件夹名称。最后，点击“验证并保存”按钮即可完成配置。现在，用户可以在多台设备上使用 Zotero，并保持同步。

## **联动 sci hub 实现英文文献批量下载**

要实现英文文献的批量下载，可以通过联动 Sci-Hub 来实现。首先需要在 Zotero 中添加 Sci-Hub 的代理链接。具体步骤如下：

1. 打开 Zotero 软件，点击菜单栏中的“编辑”->“首选项”->“高级”->“常规”->“高级设置”->“编辑器”。
2. 在“代理设置”中，搜索 findpdfs
3. 双击搜索结果，并设置为

```JavaScript
{     "name":"sci-hub",     "method":"GET",     "url":"https://sci-hub.st/{doi}",     "mode":"html",     "selector":"\#pdf",     "attribute":"src",     "automatic":true }
```

## 安装 pdf translator 插件

要安装 pdf translator 插件，可以按照以下步骤进行：

1. 从 [GitHub](https://github.com/windingwind/zotero-pdf-translate) 下载 pdf translator 插件的 `xpi` 文件
    
    [https://github.com/windingwind/zotero-pdf-translate](https://github.com/windingwind/zotero-pdf-translate)
    
2. 打开 Zotero 软件，在菜单栏中选择“工具”->“附加组件”->“从文件安装插件”。
3. 选择安装刚刚下载的 `xpi` 文件
4. 安装完成后，重启 Zotero 软件即可使用 PDF Translator 插件。

## 安装茉莉花插件

要安装茉莉花插件，可以按照以下步骤进行：

1. 从 [GitHub](https://github.com/l0o0/jasminum) 下载 茉莉花 插件的 `xpi` 文件
    
    [https://github.com/l0o0/jasminum](https://github.com/l0o0/jasminum)
    
2. 打开 Zotero 软件，在菜单栏中选择“工具”->“附加组件”->“从文件安装插件”。
3. 选择安装刚刚下载的 `xpi` 文件
4. 安装完成后，重启 Zotero 软件即可使用 茉莉花 插件。
5. 打开菜单栏中的“编辑”->“首选项”->“茉莉花”->“非官方维护中文翻译器”，点击 `更新全部`

## 添加国标参考文献样式

为了添加国标参考文献样式，可以按照以下步骤进行：

1. 打开 Zotero 软件，点击菜单栏中的“编辑”->“首选项”->“引用”->“样式”。
2. 点击 `获取更多样式`
3. 在弹出窗口中，搜索“GB/T 7714-2015”并选择该样式。