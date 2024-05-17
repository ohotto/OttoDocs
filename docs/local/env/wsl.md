---
title: WSL
order: 1
outline: 'deep'
---

# WSL 相关

::: info 参考
[How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
:::

::: tip
本文所有内容基于WSL2，可能不适用于WSL1，也不建议使用WSL1
:::

## 安装常用命令

> 安装

默认情况下，使用安装命令安装的是WSL2的Ubuntu系统

```ps
wsl --install
```

> 列出所有可安装的发行版

```ps
wsl -l -o
```

> 安装指定的发行版

```ps
wsl --install -d <Distribution Name>
```

> 列出已安装的发行版

```ps
wsl -l -v
```

## 常用命令

> 启动wsl

```ps
wsl
```

> 以指定用户启动wsl

```ps
wsl  -u <UserName>
```

> 关闭wsl

```ps
wsl --shutdown
```

> 查看wsl状态

```ps
wsl --status
```

> 查看wsl版本

```ps
wsl --version
```

> 更新wsl

```ps
wsl --update
```

## WSL走本机代理

使用[一键配置脚本](https://github.com/ohotto/wsl-proxy)

```sh
wget https://raw.githubusercontent.com/ohotto/wsl-proxy/main/proxy.sh && chmod +x proxy.sh && . ./proxy.sh
```

运行过一次后再次使用：

> 必须使用. ./proxy.sh而不是./proxy.sh运行脚本，否则配置不会生效！

```sh
. ./proxy.sh
```

## WSL使用宿主机VSCode

可以直接在wsl终端中运行：

```sh
code .
```

会自动配置VSCodeServer并打开VSCode

## 挂载宿主机硬盘

WSL2已经自动挂载宿主机硬盘到 `/mnt` 下，如 `/mnt/c`、`/mnt/d`

## 关于WSL端口被占用

### *临时解决方法

> 治标不治本的方法，重启winnat服务

```ps
net stop winnat
net start winnat
```

### 实际占用原因

Hyper-V 「TCP 动态端口范围」过大，导致常用端口被占用

查看目前「TCP 动态端口」的可选范围：

```ps
netsh int ipv4 show dynamicport tcp
```

查看当前所有已经被征用了的端口：

```ps
netsh int ipv4 show excludedportrange protocol=tcp
```

### 根本解决方法

重设 Hyper-V 「TCP 动态端口范围」

> 如下命令将把TCP 动态端口可选范围设置到49152-65535

```ps
netsh int ipv4 set dynamic tcp start=49152 num=16384
netsh int ipv6 set dynamic tcp start=49152 num=16384
```

然后**重启winnat服务**即可

```ps
net stop winnat
net start winnat
```