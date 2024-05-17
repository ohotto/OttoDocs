---
title: YouTube视频下载
order: 0
outline: 'deep'
prev: false
next: false
---

# yt-dlp - YouTube视频下载

::: info 仓库地址
https://github.com/yt-dlp/yt-dlp
:::

## 安装

安装环境：Windows

安装依赖：ffmpeg

```ps
winget install ffmpeg
```

下载yt-dlp
```ps
wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe
```

## 使用

一键下载最高画质mp4格式

```ps
./yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b" <URL>
```

批量下载

> 可以在同一个命令中写多个URL，会按顺序下载

```ps
./yt-dlp [OPTIONS] [--] URL [URL...]
```

列出所有可用格式

```ps
./yt-dlp -F <URL>
```

下载指定格式编号

> 可以用加号相连，同时下载多个格式，如：401+140

```ps
./yt-dlp -f <number> <URL>
```

## 全部参数(2024.5.17)

> ChatGPT机翻，详细参考[官方文档](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#usage-and-options)

::: details General Options: 一般选项
```sh
-h, --help                      打印此帮助文本并退出
--version                       打印程序版本并退出
-U, --update                    将此程序更新至最新版本
--no-update                     不检查更新（默认）
--update-to [CHANNEL]@[TAG]     升级/降级至特定版本。
                                如果省略，CHANNEL和TAG默认为"stable"和"latest"；
                                详见"UPDATE"。支持的渠道：stable，nightly，master
-i, --ignore-errors             忽略下载和后处理错误。
                                即使后处理失败，下载也会被视为成功
--no-abort-on-error             在下载错误时继续下一个视频；
                                例如，跳过播放列表中不可用的视频（默认）
--abort-on-error                如果发生错误，中止进一步视频下载（别名：--no-ignore-errors）
--dump-user-agent               显示当前用户代理并退出
--list-extractors               列出所有支持的提取器并退出
--extractor-descriptions        输出所有支持的提取器的描述并退出
--use-extractors NAMES          以逗号分隔的提取器名称。
                                您也可以使用正则表达式，"all"，"default"和"end"（结束URL匹配）；例如 --ies
                                "holodex.*,end,youtube"。名称前面加上"-"表示排除，例如 --ies
                                default,-generic。使用 --list-extractors 查看提取器名称列表（别名：--ies）
--default-search PREFIX         用于不合格URL的前缀。例如
                                "gvsearch2:python" 从Google视频中下载两个搜索词为"python"的视频。
                                使用值"auto"让yt-dlp猜测（"auto_warning"在猜测时发出警告）。
                                "error"只会抛出错误。默认值"fixup_error"修复损坏的URL，
                                但如果不可能修复，则发出错误而不是搜索
--ignore-config                 不再加载任何配置文件
                                除了给定给 --config-locations 的文件。
                                为了向后兼容，如果在系统配置文件中找到此选项，则不加载用户配置。
                                （别名：--no-config）
--no-config-locations           不加载任何自定义配置文件（默认）。
                                如果在配置文件中给定此选项，则忽略当前文件中定义的所有先前的 --config-locations
--config-locations PATH         主配置文件的位置；
                                可以是配置文件的路径或其包含目录（"-"为stdin）。
                                可以多次使用，也可以在其他配置文件中使用
--flat-playlist                 不提取播放列表中的视频，
                                仅列出它们
--no-flat-playlist              完全提取播放列表中的视频（默认）
--live-from-start               从开始下载直播流。
                                目前仅支持YouTube（实验性）
--no-live-from-start            从当前时间下载直播流（默认）
--wait-for-video MIN[-MAX]      等待计划的流变为可用。传递最小的秒数（或范围）在重试之间等待
--no-wait-for-video             不等待计划的流（默认）
--mark-watched                  标记视频为已观看（即使使用 --simulate）
--no-mark-watched               不标记视频为已观看（默认）
--color [STREAM:]POLICY         是否在输出中发出颜色代码，
                                可以选择在前面加上STREAM（stdout或stderr）以应用设置。
                                可以是"always"，"auto"（默认），"never"，或"no_color"（使用非颜色终端序列）。
                                可以多次使用
--compat-options OPTS           选项可帮助保持与youtube-dl或youtube-dlc配置的兼容性，
                                通过撤销yt-dlp中做出的一些更改。
                                详见"默认行为中的差异"以获取详细信息
--alias ALIASES OPTIONS         为选项字符串创建别名。除非别名以破折号"-"开头，
                                否则它将以"--"为前缀。参数将根据Python字符串格式化迷你语言进行解析。
                                例如 --alias get-audio,-X
                                "-S=aext:{0},abr -x --audio-format {0}"
                                创建选项"--get-audio"和"-X"，它们需要一个参数（ARG0），
                                并扩展为"-S=aext:ARG0,abr -x --audio-format ARG0"。
                                所有定义的别名都会列在 --help 输出中。
                                别名选项可能触发更多别名，因此请小心避免定义递归选项。
                                作为安全措施，每个别名最多可触发100次。
                                此选项可以多次使用
```
:::

::: details Network Options: 网络选项
```sh
--proxy URL                     使用指定的HTTP/HTTPS/SOCKS代理。要
                                启用SOCKS代理，请指定正确的方案，
                                例如 socks5://user:pass@127.0.0.1:1080/。
                                传递空字符串 (--proxy "") 以进行
                                直接连接
--socket-timeout SECONDS        放弃之前等待的时间，以秒为单位
--source-address IP             绑定到的客户端IP地址
--impersonate CLIENT[:OS]       用于请求的客户端冒充。例如
                                chrome，chrome-110，chrome:windows-10。传递
                                --impersonate="" 以冒充任何客户端
--list-impersonate-targets      列出可冒充的客户端
-4, --force-ipv4                所有连接通过IPv4进行
-6, --force-ipv6                所有连接通过IPv6进行
--enable-file-urls              启用 file:// URL。出于安全原因，默认情况下禁用

```
:::

::: details Geo-restriction: 地理限制
```sh
--geo-verification-proxy URL    使用此代理来验证一些地理受限站点的IP地址。实际下载时会使用由--proxy指定的默认代理（如果不存在该选项，则不使用代理）
--xff VALUE                     如何伪造X-Forwarded-For HTTP头以尝试绕过地理限制。可以是“default”（仅在已知有用时），“never”，CIDR表示法中的IP块，或者两字母的ISO 3166-2国家代码
```
:::

::: details Video Selection: 视频选择
```sh
-I, --playlist-items ITEM_SPEC  要下载的项目的逗号分隔的playlist_index。您可以使用“[START]:[STOP][:STEP]”指定范围。为了向后兼容，也支持START-STOP。使用负索引从右侧计数，使用负步长以相反顺序下载。例如，“-I 1:3,7,-5::2”用于大小为15的播放列表将下载索引为1,2,3,7,11,13,15的项目
--min-filesize SIZE             如果文件大小小于SIZE，则中止下载，例如50k或44.6M
--max-filesize SIZE             如果文件大小大于SIZE，则中止下载，例如50k或44.6M
--date DATE                     仅下载在此日期上传的视频。日期可以是“YYYYMMDD”或格式为[now|today|yesterday][-N[day|week|month|year]]。例如，“--date today-2weeks”仅下载两周前同一天上传的视频
--datebefore DATE               仅下载在此日期上传或之前的视频。接受的日期格式与--date相同
--dateafter DATE                仅下载在此日期上传或之后的视频。接受的日期格式与--date相同
--match-filters FILTER          通用视频过滤器。可以使用"Filtering Formats"中定义的运算符将任何“OUTPUT TEMPLATE”字段与数字或字符串进行比较。如果字段存在，则只需指定一个字段进行匹配，使用“！field”检查字段是否不存在，并使用“&”检查多个条件。使用“\”转义“&”或需要时使用引号。如果多次使用，则在至少满足一个条件时匹配。例如，--match-filter !is_live --match-filter "like_count>?100 & description~='(?i)\bcats \& dogs\b'"仅匹配非直播视频或具有超过100个赞（或该字段不可用）且包含短语“cats & dogs”（不区分大小写）的描述。使用“--match-filter -”交互式询问是否下载每个视频
--no-match-filters              不使用任何--match-filter（默认）
--break-match-filters FILTER    与“--match-filters”相同，但在拒绝视频时停止下载过程
--no-break-match-filters        不使用任何--break-match-filters（默认）
--no-playlist                   如果URL引用视频和播放列表，则仅下载视频
--yes-playlist                  如果URL引用视频和播放列表，则下载播放列表
--age-limit YEARS               仅下载适合给定年龄的视频
--download-archive FILE         仅下载未列在存档文件中的视频。将所有已下载视频的ID记录在其中
--no-download-archive           不使用存档文件（默认）
--max-downloads NUMBER          在下载NUMBER个文件后中止
--break-on-existing             在遇到存档中存在的文件时停止下载过程
--no-break-on-existing          在遇到存档中存在的文件时不停止下载过程（默认）
--break-per-input               更改--max-downloads，--break-on-existing，--break-match-filter和autonumber以每个输入URL重置
--no-break-per-input            --break-on-existing和类似选项终止整个下载队列
--skip-playlist-after-errors N  允许的失败次数，直到跳过播放列表的其余部分
```
:::

::: details Download Options: 下载选项
```sh
-N, --concurrent-fragments N    同时下载的dash/hlsnative视频片段数（默认为1）
-r, --limit-rate RATE           下载速率的最大值，单位为字节每秒，例如50K或4.2M
--throttled-rate RATE           下载速率的最小值，单位为字节每秒，低于此速率将被认为需要限速并重新提取视频数据，例如100K
-R, --retries RETRIES           重试次数（默认为10），或者“infinite”
--file-access-retries RETRIES   在文件访问错误时重试的次数（默认为3），或者“infinite”
--fragment-retries RETRIES      片段的重试次数（默认为10），或者“infinite”（DASH、hlsnative和ISM）
--retry-sleep [TYPE:]EXPR       重试之间的睡眠时间（以秒为单位），可选择添加重试类型（http（默认）、fragment、file_access、extractor）作为前缀以应用睡眠。EXPR可以是一个数字，linear=START[:END[:STEP=1]]或exp=START[:END[:BASE=2]]。此选项可多次使用以为不同的重试类型设置睡眠时间，例如--retry-sleep linear=1::2 --retry-sleep fragment:exp=1:20
--skip-unavailable-fragments    跳过DASH、hlsnative和ISM下载中不可用的片段（默认）（别名：--no-abort-on-unavailable-fragments）
--abort-on-unavailable-fragments    如果片段不可用，则中止下载（别名：--no-skip-unavailable-fragments）
--keep-fragments                在下载完成后保留磁盘上已下载的片段
--no-keep-fragments             在下载完成后删除已下载的片段（默认）
--buffer-size SIZE              下载缓冲区的大小，例如1024或16K（默认为1024）
--resize-buffer                 缓冲区大小会从--buffer-size的初始值自动调整（默认）
--no-resize-buffer              不自动调整缓冲区大小
--http-chunk-size SIZE          基于分块的HTTP下载的块大小，例如10485760或10M（默认为禁用）。可能对绕过由网络服务器施加的带宽限制有用（实验性）
--playlist-random               随机顺序下载播放列表视频
--lazy-playlist                 按照接收到的顺序处理播放列表中的条目。这将禁用n_entries、--playlist-random和--playlist-reverse
--no-lazy-playlist              仅在解析整个播放列表后处理播放列表中的视频（默认）
--xattr-set-filesize            使用预期文件大小设置文件xattribute ytdl.filesize
--hls-use-mpegts                对HLS视频使用mpegts容器；允许一些播放器在下载时播放视频，并减少下载中断时文件损坏的机会。对于直播流，默认启用此选项
--no-hls-use-mpegts             不对HLS视频使用mpegts容器。在不下载直播流时默认使用此选项
--download-sections REGEX       仅下载与正则表达式匹配的章节。"*"前缀表示时间范围而不是章节。负时间戳从结尾计算。可以使用"*from-url"来在URL提取的“start_time”和“end_time”之间进行下载。需要ffmpeg。此选项可多次使用以下载多个部分，例如--download-sections "*10:15-inf" --download-sections "intro"
--downloader [PROTO:]NAME       要使用的外部下载器的名称或路径（可选择）前缀为协议（http、ftp、m3u8、dash、rstp、rtmp、mms）。当前支持native、aria2c、avconv、axel、curl、ffmpeg、httpie、wget。您可以多次使用此选项为不同协议设置不同的下载器。例如--downloader aria2c --downloader "dash,m3u8:native"将使用aria2c进行http/ftp下载，并使用native下载器进行dash/m3u8下载（别名：--external-downloader）
--downloader-args NAME:ARGS     为外部下载器提供这些参数。指定下载器名称和用冒号“:”分隔的参数。对于ffmpeg，可以使用与--postprocessor-args相同的语法将参数传递给不同位置。您可以多次使用此选项为不同下载器提供不同的参数（别名：--external-downloader-args）
```
:::

::: details Filesystem Options: 文件系统选项
```sh
-a, --batch-file FILE           包含要下载的URL的文件（“-”表示标准输入），每行一个URL。以“#”、“;”或“]”开头的行被视为注释并被忽略
--no-batch-file                 不从批处理文件中读取URL（默认）
-P, --paths [TYPES:]PATH        文件应下载的路径。通过冒号“:”分隔文件类型和路径。支持与--output相同的所有类型。此外，还可以提供“home”（默认）和“temp”路径。所有中间文件首先下载到临时路径，然后在下载完成后将最终文件移动到主路径。如果--output是绝对路径，则忽略此选项
-o, --output [TYPES:]TEMPLATE   输出文件名模板；参见“OUTPUT TEMPLATE”以获取详细信息
--output-na-placeholder TEXT    --output中不可用字段的占位符（默认为“NA”）
--restrict-filenames            限制文件名仅包含ASCII字符，并避免在文件名中使用“&”和空格
--no-restrict-filenames         允许在文件名中使用Unicode字符，“&”和空格（默认）
--windows-filenames             强制文件名兼容Windows
--no-windows-filenames          仅在使用Windows时使文件名兼容Windows（默认）
--trim-filenames LENGTH         限制文件名长度（不包括扩展名）为指定的字符数
-w, --no-overwrites             不覆盖任何文件
--force-overwrites              覆盖所有视频和元数据文件。此选项包括--no-continue
--no-force-overwrites           不覆盖视频，但覆盖相关文件（默认）
-c, --continue                  恢复部分下载的文件/片段（默认）
--no-continue                   不恢复部分下载的片段。如果文件没有分段，则重新开始下载整个文件
--part                          使用.part文件而不是直接写入输出文件（默认）
--no-part                       不使用.part文件-直接写入输出文件
--mtime                         使用最后修改的标头来设置文件修改时间（默认）
--no-mtime                      不使用最后修改的标头来设置文件修改时间
--write-description             将视频描述写入.description文件
--no-write-description          不写入视频描述（默认）
--write-info-json               将视频元数据写入.info.json文件（可能包含个人信息）
--no-write-info-json            不写入视频元数据（默认）
--write-playlist-metafiles      在使用--write-info-json、--write-description等时，将播放列表元数据写入视频元数据中（默认）
--no-write-playlist-metafiles   在使用--write-info-json、--write-description等时，不写入播放列表元数据
--clean-info-json               从infojson中删除一些内部元数据，如文件名（默认）
--no-clean-info-json            将所有字段写入infojson
--write-comments                检索要放置在infojson中的视频评论。即使未使用此选项，如果提取已知快速，则也会获取评论（别名：--get-comments）
--no-write-comments             除非已知提取快速，否则不检索视频评论（别名：--no-get-comments）
--load-info-json FILE           包含视频信息的JSON文件（使用“--write-info-json”选项创建）
--cookies FILE                  Netscape格式的文件，用于读取和转储cookie jar
--no-cookies                    不从/到文件读取/转储cookie（默认）
--cookies-from-browser BROWSER[+KEYRING][:PROFILE][::CONTAINER]
                                要加载cookie的浏览器名称。当前支持的浏览器有：brave、chrome、chromium、edge、firefox、opera、safari、vivaldi。在Linux上可选地，用于解密Chromium cookie的KEYRING，要加载cookie的PROFILE的名称/路径以及CONTAINER名称（如果是Firefox）（“none”表示无容器）可以使用各自的分隔符给出。默认情况下，使用最近访问的配置文件的所有容器。当前支持的keyrings有：basictext、gnomekeyring、kwallet、kwallet5、kwallet6
--no-cookies-from-browser       不从浏览器加载cookie（默认）
--cache-dir DIR                 yt-dlp可以永久存储某些下载信息（如客户端ID和签名）的文件系统位置。默认为${XDG_CACHE_HOME}/yt-dlp
--no-cache-dir                  禁用文件系统缓存
--rm-cache-dir                  删除所有文件系统缓存文件
```
:::

::: details Thumbnail Options: 缩略图选项
```sh
--write-thumbnail               将缩略图图像写入磁盘
--no-write-thumbnail            不将缩略图图像写入磁盘（默认）
--write-all-thumbnails          将所有缩略图图像格式写入磁盘
--list-thumbnails               列出每个视频的可用缩略图。除非使用--no-simulate，否则为模拟
```
:::

::: details Internet Shortcut Options: Internet 快捷方式选项
```sh
--write-link                    根据当前平台写入互联网快捷方式文件（.url、.webloc或.desktop）。URL可能会被操作系统缓存
--write-url-link                写入一个.url Windows互联网快捷方式。操作系统会根据文件路径缓存URL
--write-webloc-link             写入一个.webloc macOS互联网快捷方式
--write-desktop-link            写入一个.desktop Linux互联网快捷方式
```
:::

::: details Verbosity and Simulation Options: 详细程度和模拟选项
```sh
-q, --quiet                     激活安静模式。如果与--verbose一起使用，则将日志打印到stderr
--no-quiet                      停用安静模式（默认）
--no-warnings                   忽略警告
-s, --simulate                  不下载视频，也不将任何内容写入磁盘
--no-simulate                   即使使用打印/列出选项，也下载视频
--ignore-no-formats-error       忽略“没有视频格式”错误。即使视频实际上不可用于下载，也可以提取元数据（实验性）
--no-ignore-no-formats-error    当找不到可下载的视频格式时抛出错误（默认）
--skip-download                 不下载视频，但写入所有相关文件（别名：--no-download）
-O, --print [WHEN:]TEMPLATE     要打印到屏幕的字段名称或输出模板，可选择以“when”为前缀来打印它，用“:”分隔。支持的“WHEN”值与--use-postprocessor相同（默认为video）。意味着--quiet。除非使用--no-simulate或后续阶段的WHEN，否则意味着--simulate。此选项可多次使用
--print-to-file [WHEN:]TEMPLATE FILE
                                将给定模板追加到文件中。WHEN和TEMPLATE的值与--print相同。文件使用与输出模板相同的语法。此选项可多次使用
-j, --dump-json                 安静，但为每个视频打印JSON信息。除非使用--no-simulate，否则为模拟。有关可用键的描述，请参见“OUTPUT TEMPLATE”
-J, --dump-single-json          安静，但为每个传递的url或infojson打印JSON信息。除非使用--no-simulate，否则为模拟。如果URL引用播放列表，则整个播放列表信息将以单行形式转储
--force-write-archive           强制写入下载存档条目，只要没有发生错误，即使使用了-s或其他模拟选项（别名：--force-download-archive）
--newline                       将进度条输出为新行
--no-progress                   不打印进度条
--progress                      显示进度条，即使在安静模式下
--console-title                 在控制台标题栏中显示进度
--progress-template [TYPES:]TEMPLATE
                                用于进度输出的模板，可选择前缀之一为“download:”（默认）、“download-title:”（控制台标题）、“postprocess:”或“postprocess-title:”。视频字段可以在“info”键下访问，进度属性可在“progress”键下访问。例如--console-title --progress-template "download-title:%(info.id)s-%(progress.eta)s"
--progress-delta SECONDS        进度输出之间的时间间隔（默认为0）
-v, --verbose                   打印各种调试信息
--dump-pages                    打印以base64编码的下载页面以调试问题（非常详细）
--write-pages                   将下载的中间页面写入当前目录中的文件以调试问题
--print-traffic                 显示发送和接收的HTTP流量
```
:::

::: details Workarounds: 解决方法
```sh
--encoding ENCODING             强制使用指定的编码（实验性）
--legacy-server-connect         明确允许与不支持RFC 5746安全重新协商的服务器建立HTTPS连接
--no-check-certificates         抑制HTTPS证书验证
--prefer-insecure               使用未加密连接检索有关视频的信息（当前仅适用于YouTube）
--add-headers FIELD:VALUE       指定自定义HTTP标头及其值，用冒号“:”分隔。可以多次使用此选项
--bidi-workaround               解决缺乏双向文本支持的终端问题。需要在PATH中具有bidiv或fribidi可执行文件
--sleep-requests SECONDS        在数据提取期间请求之间休眠的秒数
--sleep-interval SECONDS        在每次下载之前休眠的秒数。当与--max-sleep-interval一起使用时，这是休眠的最短时间（别名：--min-sleep-interval）
--max-sleep-interval SECONDS    最大休眠秒数。只能与--min-sleep-interval一起使用
--sleep-subtitles SECONDS       在每个字幕下载之前休眠的秒数
```
:::

::: details Video Format Options: 视频格式选项
```sh
-f, --format FORMAT             视频格式代码，详见“格式选择”获取更多详情
-S, --format-sort SORTORDER     按给定字段对格式进行排序，详见“格式排序”获取更多详情
--format-sort-force             强制用户指定的排序顺序优先于所有字段，详见“格式排序”获取更多详情（别名：--S-force）
--no-format-sort-force          一些字段优先于用户指定的排序顺序（默认）
--video-multistreams            允许多个视频流合并为单个文件
--no-video-multistreams         每个输出文件仅下载一个视频流（默认）
--audio-multistreams            允许多个音频流合并为单个文件
--no-audio-multistreams         每个输出文件仅下载一个音频流（默认）
--prefer-free-formats           优先选择具有免费容器的视频格式，而不是相同质量的非免费容器。与“-S ext”一起使用可以严格优先选择免费容器而不考虑质量
--no-prefer-free-formats        不对免费容器给予任何特殊偏好（默认）
--check-formats                 确保仅从实际可下载的格式中选择
--check-all-formats             检查所有格式是否实际可下载
--no-check-formats              不检查格式是否实际可下载
-F, --list-formats              列出每个视频的可用格式。除非使用--no-simulate，否则为模拟
--merge-output-format FORMAT    合并格式时可能使用的容器，用“/”分隔，例如“mp4/mkv”。如果不需要合并，则忽略。（当前支持：avi、flv、mkv、mov、mp4、webm）
```
:::

::: details Subtitle Options: 字幕选项
```sh
--write-subs                    写入字幕文件
--no-write-subs                 不写入字幕文件（默认）
--write-auto-subs               写入自动生成的字幕文件（别名：--write-automatic-subs）
--no-write-auto-subs            不写入自动生成的字幕（默认）（别名：--no-write-automatic-subs）
--list-subs                     列出每个视频的可用字幕。除非使用--no-simulate，否则为模拟
--sub-format FORMAT             字幕格式；接受格式偏好，例如“srt”或“ass/srt/best”
--sub-langs LANGS               要下载的字幕语言（可以是正则表达式）或使用逗号分隔的“all”，例如--sub-langs "en.*,ja"。您可以在语言代码前加“-”以排除它们，例如--sub-langs all,-live_chat。使用--list-subs获取可用语言标签列表
```
:::

::: details Authentication Options: 身份验证选项
```sh
-u, --username USERNAME                 使用此帐户ID登录
-p, --password PASSWORD                 帐户密码。如果省略此选项，yt-dlp将以交互方式请求
-2, --twofactor TWOFACTOR               两步验证代码
-n, --netrc                             使用.netrc身份验证数据
--netrc-location PATH                   .netrc身份验证数据的位置；可以是路径或包含目录。默认为~/.netrc
--netrc-cmd NETRC_CMD                   用于获取提取程序凭据的要执行的命令
--video-password PASSWORD               视频特定密码
--ap-mso MSO                            Adobe Pass多系统运营商（电视供应商）标识符，使用--ap-list-mso获取可用MSO列表
--ap-username USERNAME                  多系统运营商帐户登录
--ap-password PASSWORD                  多系统运营商帐户密码。如果省略此选项，yt-dlp将以交互方式请求
--ap-list-mso                           列出所有支持的多系统运营商
--client-certificate CERTFILE           PEM格式的客户端证书文件路径。可能包括私钥
--client-certificate-key KEYFILE        客户端证书的私钥文件路径
--client-certificate-password PASSWORD  客户端证书私钥的密码，如果加密。如果未提供且密钥已加密，则yt-dlp将以交互方式请求
```
:::

::: details Post-Processing Options: 后处理选项
```sh
-x, --extract-audio             将视频文件转换为仅音频文件（需要ffmpeg和ffprobe）
--audio-format FORMAT           在使用-x时要将音频转换为的格式（当前支持：best（默认）、aac、alac、flac、m4a、mp3、opus、vorbis、wav）。您可以使用类似于--remux-video的语法指定多个规则
--audio-quality QUALITY         在使用-x转换音频时指定要使用的ffmpeg音频质量。插入一个值介于0（最佳）和10（最差）之间的VBR或特定比特率，如128K（默认为5）
--remux-video FORMAT            如果必要，将视频重新封装为另一个容器（当前支持：avi、flv、gif、mkv、mov、mp4、webm、aac、aiff、alac、flac、m4a、mka、mp3、ogg、opus、vorbis、wav）。如果目标容器不支持视频/音频编解码器，则重新封装将失败。您可以指定多个规则；例如“aac>m4a/mov>mp4/mkv”将aac重新封装为m4a，mov重新封装为mp4，其他任何文件重新封装为mkv
--recode-video FORMAT           如果需要，重新编码视频为另一种格式。语法和支持的格式与--remux-video相同
--postprocessor-args NAME:ARGS  将这些参数提供给后处理程序。指定后处理程序/可执行文件名称和由冒号“:”分隔的参数，以将参数提供给指定的后处理程序/可执行文件。支持的PP为：Merger、ModifyChapters、SplitChapters、ExtractAudio、VideoRemuxer、VideoConvertor、Metadata、EmbedSubtitle、EmbedThumbnail、SubtitlesConvertor、ThumbnailsConvertor、FixupStretched、FixupM4a、FixupM3u8、FixupTimestamp和FixupDuration。支持的可执行文件为：AtomicParsley、FFmpeg和FFprobe。您还可以指定“PP+EXE:ARGS”仅在由指定后处理程序使用时将参数提供给指定可执行文件。另外，对于ffmpeg/ffprobe，可以选择在前缀后面可选地添加“_i”/“_o”以及数字，以在指定的输入/输出文件之前传递参数，例如--ppa "Merger+ffmpeg_i1:-v quiet"。您可以多次使用此选项以向不同的后处理程序提供不同的参数（别名：--ppa）
-k, --keep-video                在后处理后保留中间视频文件在磁盘上
--no-keep-video                 在后处理后删除中间视频文件（默认）
--post-overwrites               覆盖后处理文件（默认）
--no-post-overwrites            不覆盖后处理文件
--embed-subs                    将字幕嵌入视频中（仅适用于mp4、webm和mkv视频）
--no-embed-subs                 不嵌入字幕（默认）
--embed-thumbnail               将缩略图嵌入视频作为封面
--no-embed-thumbnail            不嵌入缩略图（默认）
--embed-metadata                将元数据嵌入视频文件。如果存在章节/infojson，则也会嵌入章节/infojson，除非使用--no-embed-chapters/--no-embed-info-json（别名：--add-metadata）
--no-embed-metadata             不向文件添加元数据（默认）（别名：--no-add-metadata）
--embed-chapters                向视频文件添加章节标记（别名：--add-chapters）
--no-embed-chapters             不添加章节标记（默认）（别名：--no-add-chapters）
--embed-info-json               将infojson作为附件嵌入到mkv/mka视频文件中
--no-embed-info-json            不将infojson作为附件嵌入到视频文件中
--parse-metadata [WHEN:]FROM:TO
                                从其他字段解析额外的元数据，如标题/艺术家；详见“MODIFYING METADATA”获取详细信息。“WHEN”的支持值与--use-postprocessor相同（默认为pre_process）
--replace-in-metadata [WHEN:]FIELDS REGEX REPLACE
                                使用给定的正则表达式替换元数据字段中的文本。此选项可以多次使用。“WHEN”的支持值与--use-postprocessor相同（默认为pre_process）
--xattrs                        将元数据写入视频文件的xattrs（使用dublin core和xdg标准）
--concat-playlist POLICY        连接播放列表中的视频。其中之一是“never”、“always”或“multi_video”（默认；只有当视频形成单个节目时）。所有视频文件必须具有相同的编解码器和流数量才能连接。可以使用“pl_video:”前缀与“--paths”和“--output”一起设置连接文件的输出文件名。有关详细信息，请参见“OUTPUT TEMPLATE”
--fixup POLICY                  自动纠正文件的已知故障。其中之一是never（不做任何操作）、warn（仅发出警告）、detect_or_warn（默认值；如果可以修复文件，则修复文件，否则发出警告）、force（尝试修复即使文件已存在）
--ffmpeg-location PATH          ffmpeg二进制文件的位置；可以是二进制文件的路径或其包含目录
--exec [WHEN:]CMD               执行命令，可选择前缀以执行它，由冒号“:”分隔。支持的“WHEN”值与--use-postprocessor相同（默认为after_move）。可以使用与输出模板相同的语法将任何字段作为参数传递给命令。如果未传递任何字段，则%(filepath,_filename|)q将附加到命令的末尾。此选项可多次使用
--no-exec                       删除任何先前定义的--exec
--convert-subs FORMAT           将字幕转换为另一种格式（当前支持：ass、lrc、srt、vtt）（别名：--convert-subtitles）
--convert-thumbnails FORMAT     将缩略图转换为另一种格式（当前支持：jpg、png、webp）。您可以使用类似于--remux-video的语法指定多个规则
--split-chapters                根据内部章节将视频拆分为多个文件。“chapter:”前缀可用于与“--paths”和“--output”一起设置拆分文件的输出文件名。有关详细信息，请参见“OUTPUT TEMPLATE”
--no-split-chapters             不基于章节拆分视频（默认）
--remove-chapters REGEX         删除标题与给定正则表达式匹配的章节。语法与--download-sections相同。此选项可以多次使用
--no-remove-chapters            不从文件中删除任何章节（默认）
--force-keyframes-at-cuts       在下载/拆分/移除章节时在切割处强制关键帧。由于需要重新编码，这会很慢，但生成的视频可能在切割处有更少的伪影
--no-force-keyframes-at-cuts    不在切割时强制关键帧（默认）
--use-postprocessor NAME[:ARGS] 启用后处理程序的插件名称（区分大小写），并（可选）将参数传递给它，用冒号“:”分隔。ARGS是一个用分号“;”分隔的NAME=VALUE列表。参数“when”确定何时调用后处理程序。它可以是以下之一：“pre_process”（视频提取后）、“after_filter”（视频通过滤镜后）、“video”（--format后；--print/--output之前）、“before_dl”（每次视频下载前）、“post_process”（每次视频下载后；默认）、“after_move”（将视频文件移动到最终位置后
```
:::

::: details SponsorBlock Options: SponsorBlock 选项
```sh
--sponsorblock-mark CATS        要为其创建章节的SponsorBlock类别，用逗号分隔。可用类别有sponsor、intro、outro、selfpromo、preview、filler、interaction、music_offtopic、poi_highlight、chapter、all和default（=all）。您可以在类别前加“-”来排除它。查看[1]以获取类别描述。例如--sponsorblock-mark all,-preview
[1] https://wiki.sponsor.ajay.app/w/Segment_Categories
--sponsorblock-remove CATS      从视频文件中移除的SponsorBlock类别，用逗号分隔。如果一个类别同时存在于mark和remove中，remove优先。语法和可用类别与--sponsorblock-mark相同，只是“default”指的是“all,-filler”，poi_highlight和chapter不可用
--sponsorblock-chapter-title TEMPLATE
                                用于由--sponsorblock-mark创建的SponsorBlock章节标题的输出模板。可用字段仅有start_time、end_time、category、categories、name、category_names。默认为“[SponsorBlock]: %(category_names)l”
--no-sponsorblock               禁用--sponsorblock-mark和--sponsorblock-remove
--sponsorblock-api URL          SponsorBlock API位置，默认为https://sponsor.ajay.app
```
:::

::: details Extractor Options: 提取器选项
```sh
--extractor-retries RETRIES     已知提取器错误的重试次数（默认为3），或“infinite”
--allow-dynamic-mpd             处理动态DASH清单（默认）（别名：--no-ignore-dynamic-mpd）
--ignore-dynamic-mpd            不处理动态DASH清单（别名：--no-allow-dynamic-mpd）
--hls-split-discontinuity       在不连续的地方（例如广告中断）将HLS播放列表拆分为不同格式
--no-hls-split-discontinuity    不在不连续的地方（例如广告中断）将HLS播放列表拆分为不同格式（默认）
--extractor-args IE_KEY:ARGS    向IE_KEY提取器传递ARGS参数。详见“EXTRACTOR ARGUMENTS”获取详细信息。您可以多次使用此选项为不同提取器提供参数
```
:::
