---
title: VPS高速连接
order: 1
outline: 'deep'
---

# VPS高速连接小技巧

## 穿透（入站）

> 一键xray

```sh
bash <(wget -qO- -o- https://github.com/233boy/Xray/raw/main/install.sh)
# 再次运行
xray
```

> 一键alpine-hysteria2

```sh
wget -O hy2.sh https://raw.githubusercontent.com/zrlhk/alpine-hysteria2/main/hy2.sh  && sh hy2.sh
```

## 中转

> 一键EasyGost

```sh
wget --no-check-certificate -O gost.sh https://raw.githubusercontent.com/KANIKIG/Multi-EasyGost/master/gost.sh && chmod +x gost.sh && ./gost.sh
# 再次运行
./gost.sh
```

> 使用 iptable 端口转发

```sh
# 客户端直接根据真实的远程xray服务器的参数来配置即可(客户端outbounds中address与port参数除外,应配置成中转机的IP与下方的ingress_port)
# 远程xray服务器的IP
export remote_xray_server_ip=

# 远程xray服务器的端口
export remote_xray_server_port=

# 中转机的公网IP
export out_interface_ip=

# 本地入端口(与客户端outbounds中配置的服务器端口相同)
export ingress_port=

# 开启IP转发
echo 1 > /proc/sys/net/ipv4/ip_forward

iptables -t nat -A PREROUTING -p tcp -m tcp --dport ${ingress_port} -j DNAT --to-destination ${remote_xray_server_ip}:${remote_xray_server_port}
iptables -t nat -A POSTROUTING -p tcp -d ${remote_xray_server_ip}/32 -j SNAT --to-source ${out_interface_ip}
iptables -A FORWARD -s ${remote_xray_server_ip}/32 -j ACCEPT
iptables -A FORWARD -d ${remote_xray_server_ip}/32 -j ACCEPT
```

## 落地（出站）

### 纯ipv6小鸡访问ipv4

> Google DNS64

```sh
# 会覆盖原有dns，注意备份
echo -e "nameserver 2001:4860:4860::8888\nnameserver 2001:4860:4860::8844" > /etc/resolv.conf
```

### 获得双栈出站能力

> 一键warp

```sh
# duocloud群推荐
wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh
# 再次运行
warp
```

```sh
# p3terx
bash <(curl -fsSL git.io/warp.sh)
```