---
title: nezha 探针
order: 2
outline: 'deep'
---

# nezha 探针相关

## 自定义 Agent 监控项目

> 解决 LXC 小鸡仰卧起坐
> 只需要添加安装参数：`--skip-conn`即可

### 自定义监控的网卡和硬盘分区

* 执行 `/opt/nezha/agent/nezha-agent --edit-agent-config` 来选择自定义的网卡和分区，然后重启 Agent 即可生效

### 其他运行参数

通过执行 `./nezha-agent --help` 查看支持的参数，如果你使用了一键脚本安装Agent，可以编辑 `/etc/systemd/system/nezha-agent.service`，在 `ExecStart=` 这一行的末尾加上以下参数

- `--report-delay` 控制系统信息上报的间隔，默认为 1 秒，可以设置为 3 来进一步降低 agent 端系统资源占用（配置区间 1-4）
- `--skip-conn` 不监控连接数，推荐 机场/连接密集型 服务器或CPU占用较高的服务器设置
- `--skip-procs` 不监控进程数，也可以降低 Agent 占用
- `--disable-auto-update` 禁止 **自动更新** Agent（安全特性）
- `--disable-force-update` 禁止 **强制更新** Agent（安全特性）
- `--disable-command-execute` 禁止在 Agent 上执行定时任务、打开在线终端（安全特性）
- `--tls` 启用 SSL/TLS 加密（使用 nginx 反向代理 Agent 的 grpc 连接，并且 nginx 开启 SSL/TLS 时，需要启用该项配置）

## 常用监控告警

### 流量监控

添加告警规则

```json
[
    {
        "type": "transfer_all_cycle",   //可选：transfer_in_cycle 入站流量、transfer_out_cycle 出站流量、transfer_all_cycle 双向流量
        "max": 1020054732800,   //单位B，1TB=1*1024*1024*1024*1024=1020054732800B
        "cycle_start": "2024-04-09T00:00:00+08:00",     //只要对于每月清零的情况，只需要日正确即可
        "cycle_interval": 1,
        "cycle_unit": "month",
        "cover": 1,     //忽略所有，仅监控ignore
        "ignore": {
            "3": true,
            "4": true
        }
    }
]
```

### CPU 高负载告警 

> CPU 占用超过 50% 持续 10 秒，忽略第 12、13 号机器

```json
[
    {
        "type": "cpu",
        "max": 50,
        "duration": 10,
        "ignore": {
            "12": true,
            "13": true
        }
    }
]
```

### RAM 高占用告警 

> RAM 占用超过 80% 持续 10 秒

```json
[
    {
        "type": "memory",
        "max": 80,
        "duration": 10
    }
]
```

### VPS 离线告警 

> vps 离线持续 1 分钟

```json
[
    {
        "type": "offline",
        "duration": 60
    }
]
```

## tg 通知机器人

### 新建机器人

关注 @Botfather ，输入/newbot ，创建新的机器人（bot）时，会提供的 token（在提示 Use this token to access the HTTP API:后面一行）这里 'bot' 三个字母不可少。

创建 bot 后，需要先在 telegram 中与 BOT 进行对话（随便发个消息），然后才可用 API 发送消息。

### 获取UserID

与机器人@userinfobot 对话可获得。

### 哪吒新建通知方式

- URL：
  - https://api.telegram.org/bot你的TG_BOT_Token/sendMessage
- 请求方式
  - POST
- 请求类型：
  - JSON

Body：

```json
{
    "chat_id": "你的ChatID",
    "text": "# *探针警报*\n\n时间：#DATETIME#\n来自: \"#SERVER.NAME#\"\n\n*#NEZHA#*",
    "parse_mode": "Markdown",
    "reply_markup": {
        "inline_keyboard": [
            [
                {
                    "text": "来自:  \"#SERVER.NAME#\"",
                    "callback_data": "#"
                }
            ],
            [
                {
                    "text": "探针仪表盘",
                    "url": "https://nezha.wiki/"
                }
            ]
        ]
    }
}
```

::: details 支持的占位符
```json
{
    "content": "#NEZHA#",
    "ServerName": "#SERVER.NAME#",
    "ServerIP": "#SERVER.IP#",
    "ServerIPV4": "#SERVER.IPV4#",
    "ServerIPV6": "#SERVER.IPV6#",
    "CPU": "#SERVER.CPU#",
    "MEM": "#SERVER.MEM#",
    "SWAP": "#SERVER.SWAP#",
    "DISK": "#SERVER.DISK#",
    "NetInSpeed": "#SERVER.NETINSPEED#",
    "NetOutSpeed": "#SERVER.NETOUTSPEED#",
    "TransferIn": "#SERVER.TRANSFERIN#",
    "TranferOut": "#SERVER.TRANSFEROUT#",
    "Load1": "#SERVER.LOAD1#",
    "Load5": "#SERVER.LOAD5#",
    "Load15": "#SERVER.LOAD15#",
    "TCP_CONN_COUNT": "#SERVER.TCPCONNCOUNT",  # 无效
    "UDP_CONN_COUNT": "#SERVER.UDPCONNCOUNT",  # 无效
}
```
:::
