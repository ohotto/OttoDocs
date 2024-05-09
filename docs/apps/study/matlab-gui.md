---
title: MATLAB-GUI
order: 0
outline: 'deep'
---

# MATLAB-GUI 学习笔记

## 数据传递：
```MATLAB
function pushbutton1_Callback(hObject, eventdata, handles)
str = get(handles.edit1, 'String');
set(handles.edit2, 'String', str);
```

  

## 窗口可调大小

工具 - GUI选项 - 调整大小的方式 - 成比例

  

## 滚动条→数值

Slider 控件，调整：

- Max、Min 值

Edit Text 控件：

- 删除默认值

Slider 控件 Callback 代码：

```MATLAB
var = get(handles.slider1, 'value');
set(handles.edit1, 'String', num2str(var));
```

  

## Radio Button

选中 → 最大值

取消选中 → 最小值

==注意：==

==修改最小、最大值后，应同步修改默认值==

  

## Check Box

同 Radio Button

  

## Toggle Button

同上

  

## Button Group & 绘图

Button Group 中的 Radio Button 互斥

进入 Button Group 的 SelectionChangeFcn 编写代码：

```MATLAB
x = 0:0.01:2*pi;
current_Obj = get(eventdata.NewValue, 'Tag');    %得到当前被选中的tag
axes(handles.axes1)

switch current_Obj    %判断哪个 Radio Button 被选中
	case 'kj1'
		y = sin(x);
		plot(x,y)
	case 'kj2'
		y = cos(x);
		plot(x,y)
	case 'kj3'
		y = sin(x) + cos(x);
		plot(x,y)
end
```

  

## Pop-Up Menu

直接在 Pop-Up Menu 的 String 中以**换行**的方式添加选项

Value 值即为 String 中的**行号**

Callback：

```MATLAB
var = get(handles.kj1, 'value')
x = 0:0.01:2*pi;
axes(handles.axes1)

switch var
	case 1
		y = sin(x);
		plot(x,y)
	case 2
		y = cos(x);
		plot(x,y)
	case 3
		y = sin(x) + cos(x);
		plot(x,y)
end
```

  

## List Box

选择参数 Button 的 Callback：

```MATLAB
selected_index = get(handles.listbox1, 'value');    %被选中的行数
str = get(handles.listbox1, 'string');    %获取全部数据为 cell 矩阵
set(handles.edit1, 'string', str{selected_index})
```

  

## 选择参数绘制曲线

List Box 的 CreateFcn：

```MATLAB
t = 0:0.01:2*pi;
cs1 = t;
cs2 = sin(t);
cs3 = cos(t);
cs4 = sin(t) + cos(t);

CS = {cs1, cs2, cs3, cs4};
handles.CS = CS;    %将通用量保存至 handles 结构体

guidata(hObject, handles)    %更新 handles 结构体
```

选择参数 Button 的 Callback：

```MATLAB
selected_index = get(handles.listbox1, 'value');    %被选中的行数
str = get(handles.listbox1, 'string');    %获取全部数据为 cell 矩阵
set(handles.edit1, 'string', str{selected_index})

x = handles.CS{selected_index};    %调用 CS 值
handles.x = x;    %保存至 handles 结构体
guidata(hObject, handles)    %更新 handles 结构体
```

绘制曲线 Button 的 Callback：

```MATLAB
axes(handles.axes1);
plot(handles.x, handles.y)
axis equal    %坐标系 x 轴与 y 轴等长
```

  

## 清除坐标系

```MATLAB
axes(handles.axes1);    %指定坐标系
cla reset;              %清除坐标系
```

  

## 其他教程

[如何在matlab中将GUI界面封装成exe文件](https://blog.csdn.net/lhlwdgg/article/details/114279138)

[关于matlab GUI重命名的问题](https://blog.csdn.net/dmfylb/article/details/72356376)

  

## 调用另一个gui程序

如果打开的是 `gui.m` ，想跳转 `gui2.m`

在 `gui.m` 的按钮回调中写：

```MATLAB
close(gui); //想关闭的matlab界面名称——对应gui.m和gui.fig
set(gui2,'Visible','on');  //想打开的界面名称——gui.m和gui.fig
```

或

```MATLAB
set(gui2,'Visible','on');
set(handles.Figure1,'Visible','off');    //Figuare1是gui.m的tag
```

  

## 播放视频

```MATLAB
function pushbutton1_Callback(hObject, eventdata, handles)
% set(handles.axes1,'Visible','off')
% set(handles.axes1,'Visible','off')
a=VideoReader('720p/circle_1_720p.mp4');
% i=0;

while hasFrame(a)
    vidFrame = readFrame(a);
axes(handles.axes1);    
    imshow(vidFrame)
%     pause(1/a.FrameRate);
% i=i+1;
end
```

  

## 设置按钮为不可点击状态（灰色按钮）

```MATLAB
set(handles.startbtn,'enable','off');
```