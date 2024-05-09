---
title: Stable Diffusion
order: 0
outline: 'deep'
---
# Stable Diffusion 学习笔记

> [!info] Civitai
> Civitai: The Home of Open-Source Generative AI Explore thousands of high-quality Stable Diffusion models, share your AI-generated art, and engage with a vibrant community of creators [https://civitai.com/](https://civitai.com/)

> [!info] Hugging Face
> Models - Hugging Face We’re on a journey to advance and democratize artificial intelligence through open source and open science. [https://huggingface.co/models](https://huggingface.co/models)

## 🔧1 安装

### 秋葉aaaki

> [!info] 
> 【AI绘画·11月最新】Stable Diffusion整合包v4.4发布！
[https://www.bilibili.com/video/BV1iM4y1y7oA](https://www.bilibili.com/video/BV1iM4y1y7oA)

### 秋葉aaaki主页

> [!info] 
> 秋葉aaaki的个人空间-秋葉aaaki个人主页-哔哩哔哩视频
[https://space.bilibili.com/12566101](https://space.bilibili.com/12566101)

### Nenly同学教程合集

> [!info] Nenly同学教程合集的个人空间
[https://space.bilibili.com/1814756990/channel/collectiondetail?sid=1285674&ctype=0](https://space.bilibili.com/1814756990/channel/collectiondetail?sid=1285674&ctype=0)

### Nenly同学主页

> [!info] Nenly同学的个人空间
[https://space.bilibili.com/1814756990](https://space.bilibili.com/1814756990)

### 源码：

[https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

[https://github.com/CompVis/stable-diffusion](https://github.com/CompVis/stable-diffusion)

## 💬2 Prompt

- 基本规则
	- 正向提示词一般“多多益善”
	- 使用英文书写
	- 词组之间用逗号分隔
- 提示词分类
	- 内容型提示词
		- **人物及主体特征**：服装穿搭、发型发色、五官特点、面部表情、肢体动作
		- **场景特征**：室内室外、大场景、小细节
		- **环境光照**：白天黑夜、特定时段、光环境、天空
		- **画幅视角**：距离、人物比例、观察视角、镜头类型
	- 画质提示词
		- 通用高画质
		- 特定高分辨率类型
	- 画风提示词
		- 插画风
		- 二次元
		- 真实系
- 权重
	1. 加括号：()1.1倍权重 {}1.05倍权重 []0.9倍权重
	2. 括号加数字：直接定义权重，例如 (1girl:1.5)
	3. 一般权重不要超过1.5
- 混合
	`white | yellow flower`
	表示生成黄色白色混合的花
- 迁移
	`[white|red|blue] flower`
	表示先生成白花 再生成红花 再生成蓝花
- 迭代
	`(white flower:bush:0.8)`
	表示进程达到80%之前生成白花，80%之后生成灌木

## 👨‍💻3 出图参数
### 采样步数
一般20+即可，算力充足可以到30-40
### 采样方法
一般参考模型推荐，或选取常用的
### 分辨率
一般512\*512，然后高清修复
### 面部修复
可勾选
### 平铺
一般用于无缝连接的平铺图案
### 提示词相关性
一般7-12
### 随机种子
可控制生成构图稳定性
### 批次数量
数量不建议动

## 🏞️4 图生图

1. 导入图片
2. 书写提示词
3. 参数设置
	**分辨率**：建议与原图一致或等比缩小
	**重绘幅度**：真人转动漫0.6-0.8
	**随机种子**：将内容可控
1. 生成

## 📦5 CheckPoint 模型

> [!info] Civitai
> The Home of Open-Source Generative AI Explore thousands of high-quality Stable Diffusion models, share your AI-generated art, and engage with a vibrant community of creators 
> [https://civitai.com/](https://civitai.com/)

> [!info] Hugging Face
> We’re on a journey to advance and democratize artificial intelligence through open source and open science. 
> [https://huggingface.co/models](https://huggingface.co/models)

**分类关键词：**
	二次元：illustration,painting,sketch,drawing,painting,comic,anime,catoon
	真实系：photography,photo,realistic,pho-torealistic,RAW photo
	2.5D：3D,render,chibi,digital art,concept art,{realistic}
**模型推荐：**
	**二次元**：
		Anything V5
		Counterfeit V2.5
		Dreamlike Diffusion
	**真实系**：
		Deliberate
		Realistic Vision
		L.O.F.I
	**2.5D**：
		Never Ending Dream(NED)
		Protogen(Realistic)
		国风3(GuoFeng3)

## 🔍6 图片放大的三种方法
### 文生图 → 高清修复（Hi-Res Fix）
**重绘幅度**：建议0.3-0.5
**放大算法**：差别不大，可以选新版本，或者根据模型推荐
### 图生图 → SD放大（SD Upscale）
图生图更改分辨率就相当于高清修复，放大算法可以在设置修改
Upscale 相当于分块放大再合并
**使用方法**：在脚本里选择SD放大（SD Upscale）脚本
**生成尺寸**：原图尺寸+重叠尺寸
### 后期处理 → 放大算法
相当于重绘为0的高清修复，不涉及扩散过程，速度很快

## 📛7 Embeddings（词嵌入）
相当于对checkpoints的书签，可以控制人物角色、画面风格、负面效果
**使用方法**：在提示词里面加入Embeddings咒语即可

## 👜8 LoRa（低秩适应模型）
更加准确地表达角色形象、画面风内容等
**使用方法**：在提示词中用`<lora:[name]>`调用，有些LoRa可能会推荐配合提示词
**注意**：LoRa可能会影响画风，可以通过降低权重实现`<lora:[name]:0.6>`，建议0.5-0.8

## 🌐9 Hypernetwork（超网络）
实现的效果和LoRa类似，一般用于改变画风
**使用方法**：~~设置-附加网络-将超网络添加至提示词~~（最新整合包已不需要）

## 🖌️10 局部重绘
easy~
**涂鸦** → 通过涂鸦+prompt生成图片
**局部重绘** → 选定蒙版重绘区域
**涂鸦重回** → 通过涂鸦+图生图精准重绘
**上传蒙版重绘** → 通过ps绘制精确蒙版

## 👜11 LoRa
**调用方式**：
1. 在提示词中输入`<Lora:[name]>`
2. 在下面的菜单里选取（实质还是提示词）
3. additional networks插件
**应用思路**：
1. 人物角色形象
2. 画风或风格
3. 概念
4. 服饰
5. 特定元素