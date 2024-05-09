---
title: Git
order: -1
outline: 'deep'
---

# git入门

::: info 参考
 [30分钟弄懂所有工作Git必备操作 / Git 入门教程](https://www.bilibili.com/video/BV1pX4y1S7Dq/) 
:::

## 基本配置

### 安装git

> Windows

[https://git-scm.com/downloads](https://git-scm.com/downloads)

> Linux（以apt包管理为例

```sh
sudo apt install git
```



### config 配置git

> 配置姓名邮箱（只是说明性质

```sh
git config --global user.name "OttoLi"
git config --global user.email legionz@foxmail.com
```



### init 创建仓库

```sh
# Local
git init

# Cloud clone
git clone <url>
```



## 版本控制

文件状态：

```
未跟踪 ----- 未修改 ----- 已修改 ----- 已暂存
  |----           git add          --->|
              |<---   git commit   ----|
  |<--git rm--|
              |--<edit>-->|
                          |--git add-->|
```

### add/rm 跟踪/取消跟踪

> 针对`未跟踪`文件

```sh
git add <name>
git rm <name>
git rm --cache <name>    # 不跟踪但保留在目录中
```

### add/reset 暂存/取消暂存

> 针对`已修改`文件

```sh
git add <name>
git reset HEAD <name>
```

### commit 提交

> `已暂存`：还原为`未修改`

```sh
git commit    # 会弹出编辑器，要求输入commit内容
git commit -m 'description'    # 等同于上一行
```

### reset 取消提交 {#reset}

```sh
git reset head~ --soft
```

### status 查看状态（文件级别

```sh
git status
```

### diff 查看修改（行级别

```sh
git diff
```

### log 查看提交历史

```sh
git log
git log --pretty
git log --graph
```

## 远端仓库

### SSH认证

> 生成ssh密钥对

```sh
cd ~/.ssh
ssh-keygen -t rsa -C "xxx@xxx.com"
```

然后将生成的公钥在GitHub设置中上传

> 检查是否设置成功

在git bash运行：

```sh
# 启动ssh-agent
eval $(ssh-agent -s)
# 添加ssh私钥
ssh-add path_to_private_key
# 验证连接
ssh -T git@github.com
```

### remote 链接GitHub仓库（本地已有代码）

```sh
git remote add <remote-name> <url>
git remote rename    # 改名字
```

### clone 远端GitHub仓库（代码在远端）

```sh
git clone <url>
```

### push 到远端GitHub仓库

```sh
git push <remote-name> <branch>
# 加上-u参数，下一次就可以直接push
git push -u <remote-name> <branch>
git push
```

## 分支管理

可以理解分支是一个指向提交对象的指针

经典的分支配置：

- master：主要分支
- feature：添加新功能，等待合并到develop
- develop：合并多项feature，并验证新功能，确认可靠则合并到release
- release：将develop分支发布为测试版，测试整体可靠性，确认可靠则合并到master
- hot-fixes：在master分支上修复小bug

### branch 创建分支

```sh
git branch <branch>
```

### branch 查看分支

```sh
git branch --list
```

### switch 切换分支

```sh
git switch <branch>
```

### merge 合并分支

```sh
git merge <branch>
```

### fetch 获取远端信息

> 不会改变本地目录

```sh
git fetch <remote-name>
```

### checkout 检出新分支

如果这个分支在你的本地不存在，Git 会自动创建一个新的本地分支，并设置它的上游（upstream）为远端的分支

```sh
git checkout <new-branch>
```

### *关于`git pull`

`git pull` 的作用是从远程获取（fetch）最新的版本，并自动尝试合并到当前分支。换句话说，`git pull` 是 `git fetch` 和 `git merge` 的组合

## stash 贮藏

代码写了一半，如果想操作另一分支，可以使用贮藏功能先保存未提交的代码，然后再切换到其他分支

> 贮藏

```sh
git stash
```

> 切换到其他分支进行临时工作

```sh
git switch <branch>
```

> 回到贮藏分支，继续原有工作

```sh
git switch <original_branch>
git stash apply
```

## reset 重置

--> [reset](#reset)

> 没看懂，回头再补

