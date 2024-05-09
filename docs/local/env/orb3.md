---
title: ORB-SLAM3
order: 0
outline: 'deep'
---

# ORB-SLAM3 installation

> [https://blog.csdn.net/weixin_48924581/article/details/126534339](https://blog.csdn.net/weixin_48924581/article/details/126534339)

> https://github.com/electech6/ORB_SLAM3_detailed_comments
> ⬆️ 先克隆仓库


```Shell
# install tools
sudo apt update
sudo apt install git cmake gcc g++

# install EIGEN3.3.4
sudo apt-get install libeigen3-dev

# install pangolin0.6
## 安装依赖
sudo apt install libglew-dev libpython2.7-dev
## 获得pangolin的稳定版本安装包
https://github.com/stevenlovegrove/Pangolin/releases/tag/v0.6
## 编译安装
mkdir build
cd build
cmake ..
make
sudo make install	   # 安装后pangolin将在/usr/local/include/中找到
## 测试
cd build/examples/HelloPangolin
./HelloPangolin    # 运行此示例，效果显示是一个红绿蓝立方体，表示即为安装成功

# install opencv3.2.0
cd opencv-3.2.0
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local .. -DENABLE_PRECOMPILED_HEADERS=OFF
sudo make all
sudo make install
## DEBUG
OpenCV编译出错——stdlib.h: 没有那个文件或目录
在cmake时，命令中添加：-DENABLE_PRECOMPILED_HEADERS=OFF

error: 'CODEC_FLAG_GLOBAL_HEADER' was not declared in this scope
error: ‘CODEC_FLAG_GLOBAL_HEADER’ was not declared in this scope； did you mean ‘AV_CODEC_FLAG_GLOBAL
在对应文件开头添加：
#define AV_CODEC_FLAG_GLOBAL_HEADER (1 << 22)
#define CODEC_FLAG_GLOBAL_HEADER AV_CODEC_FLAG_GLOBAL_HEADER
#define AVFMT_RAWPICTURE 0x0020

opencv-3.2.0/modules/python/src2/cv2.cpp:730:34: error: invalid conversion from ‘const char*’ to ‘char*’ [-fpermissive]
打开报错对应的文件 modules/python/src2/cv2.cpp , 把第730行的 char* 改为 const char* 命令行重新make一下就过了 (权限不够前边就加个sudo).

# install opencv3.4.2https://github.com/opencv/opencv/releases/tag/4.4.0
## download opencv4.4.0 and opencv_contrib4.4.0
https://github.com/opencv/opencv/releases/tag/4.4.0
https://github.com/opencv/opencv_contrib/releases/tag/4.4.0
## 安装依赖项
sudo apt-get install build-essential
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
  # meybe "E: 无法定位软件包 libjasper-dev"
  sudo add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
  sudo apt update
  sudo apt install libjasper1 libjasper-dev
sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev 
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev liblapacke-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libatlas-base-dev gfortran 
sudo apt-get install ffmpeg
## install cmake-gui
sudo apt-get install cmake-gui
cmake-gui    # open cmake-gui
## 配置Opencv
	# 将opencv解压
	# 然后将opencv_contrib解压到opencv文件夹内
	# 并在该文件夹内创建一个build文件夹
	# cmake-gui: 
		# 源码目录选择opencv的解压目录
		# 构建的目标目录选择创建的build文件夹目录
		# 确定路径没问题之后点击configure选择Unix Makefiles，其余默认，点击finish
		这里需要对三个地方进行修改：
		（1）在CMAKE_BUILD_TYPE 值处输入RELEASE，其他保持不变（如果已经存在就不必修改）。
		（2）在OPENCV_EXTRA_MODULES_PATH处，选择输入目录（单击这一行后方空白处即可选中），接着选择opencv_contrib文件夹中的modules文件夹。
		（3）在BUILD_opencv_world后面打√。
		# 上面的内容设置好以后就可以Configure了。【把代理弄好！】
		# Configure完成之后，进行Generate
		# 完成之后，在build文件夹下重新打开一个终端
		make
    sudo make install
	# 配置环境变量
	sudo vim /etc/ld.so.conf.d/opencv.conf
		/usr/local/lib  # 添加到最后
	sudo ldconfig
	sudo vim /etc/bash.bashrc
		# 在文件后添加：
	export PKG_CONFIG_PATH=/usr/local/opencv/lib/pkgconfig 
	export LD_LIBRARY_PATH=/usr/local/opencv/lib
	
# 编译ORB_slam3

# 编译Thirdparty/DBoW2
cd Thirdparty/DBoW2
mkdir build
cd build
# 修改 CMakeLists.txt
#######################################
# find_package(OpenCV 3.2 QUIET)
# if(NOT OpenCV_FOUND)
#    find_package(OpenCV 3.0 QUIET)
#    if(NOT OpenCV_FOUND)
#       message(FATAL_ERROR "OpenCV > 3.0 not found.")
#    endif()
# endif()

LIST(APPEND CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake_modules)
 
find_package(OpenCV 4 REQUIRED)
   if(NOT OpenCV_FOUND)
      message(FATAL_ERROR "OpenCV > 4.4 not found.")
   endif()
#######################################
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j4

# 编译Thirdparty/Sophus
cd Thirdparty/Sophus
mkdir build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j4

# 解压/ORB_SLAM3/Vocabulary/ORBvoc.txt.tar.gz
# 在/ORB_SLAM3下开终端
cd Vocabulary
tar -xf ORBvoc.txt.tar.gz
cd ..

# 编译ORB_SLAM3
mkdir build
cd build
# 参考 Thirdparty/DBoW2 修改 CMakeLists.txt
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j4
```

  

## 在上述 ORB3 的基础上，直接编译 ORB2，遇到的报错：

---

参考：

[https://blog.csdn.net/capland/article/details/117651218](https://blog.csdn.net/capland/article/details/117651218)

[https://blog.csdn.net/weixin_46808875/article/details/125317128](https://blog.csdn.net/weixin_46808875/article/details/125317128)

```Shell
######################################################################
# 报错fatal error: opencv/cv.h: 没有那个文件或目录
	#include <opencv/cv.h>
打开 ORB_SLAM2/include/ORBextractor.h 把：
#include <opencv/cv.h>
替换为：
#include <opencv2/imgproc/imgproc_c.h>
#include <opencv2/highgui/highgui_c.h>

######################################################################
# 报错
error: static assertion failed: std::map must have the same value_type as its allocator
       static_assert(is_same<typename _Alloc::value_type, value_type>::value,
# 打开 ORB_SLAM2/include/LoopClosing.h 把：
typedef map<KeyFrame*,                  //键
                g2o::Sim3,                  //值
                std::less<KeyFrame*>,       //排序算法
                Eigen::aligned_allocator<std::pair<const KeyFrame*, g2o::Sim3> >
# 改为
typedef map<KeyFrame*,                  //键
                g2o::Sim3,                  //值
                std::less<KeyFrame*>,       //排序算法
                Eigen::aligned_allocator<std::pair<KeyFrame* const, g2o::Sim3> >

######################################################################
# 报错
#error: ‘CV_LOAD_IMAGE_UNCHANGED’ was not declared in this scope
#  160 |         imLeft = cv::imread(vstrImageLeft[ni],CV_LOAD_IMAGE_UNCHANGED);
打开 ORB_SLAM2/Examples/Monocular/mono_euroc.cc 把
打开 ORB_SLAM2/Examples/Monocular/mono_tum.cc 把
打开 ORB_SLAM2/Examples/Monocular/mono_kitti.cc 把
打开 ORB_SLAM2/Examples/Stereo/stereo_euroc.cc 把
打开 ORB_SLAM2/Examples/Stereo/stereo_kitti.cc 把
打开 ORB_SLAM2/Examples/RGB-D/rgbd_tum.cc 把
#include<opencv2/core/core.hpp>
改为
#include "opencv2/imgcodecs/legacy/constants_c.h"
```

## ORB_SLAM3 ROS 编译

```Shell
# 添加ROS_PACKAGE_PATH
gedit ~/.bashrc
# 添加下面的内容到.bashrc（PATH改为ROB_SLAM3目录）
export ROS_PACKAGE_PATH=${ROS_PACKAGE_PATH}:PATH/ORB_SLAM3/Examples/ROS
# 开始编译
chmod +x build_ros.sh
./build_ros.sh

# 报错1 找不到 rosdep
# [rospack] Error: the rosdep view is empty: call 'sudo rosdep init' and 'rosdep update'
# 安装 python3-rosdep
sudo apt install python3-rosdep
# 然后
sudo rosdep init
# sudo rosdep init 报错
ERROR: cannot download default sources list from:
https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/sources.list.d/20-default.list 
Website may be down.
# 自己打开上面的网址，将内容复制到：
sudo gedit /etc/ros/rosdep/sources.list.d/20-default.list
# 然后
rosdep update

# 报错2 OpenCV > 3.2 not found.
# 修改CMakeLists.txt
gedit ~/ORB_SLAM3/Examples/ROS/ORB_SLAM3/CMakeLists.txt
# 修改：
# find_package(OpenCV 3.2)
#    if(NOT OpenCV_FOUND)
#       message(FATAL_ERROR "OpenCV > 3.2 not found.")
#    endif()
find_package(OpenCV 4 REQUIRED)
   if(NOT OpenCV_FOUND)
      message(FATAL_ERROR "OpenCV > 4.4 not found.")
   endif()

# 编译成功

# Euroc双目运行报错
error "Calibration parameters to rectify stereo are missing!"
# 将命令中的EuRoC.yaml改为Examples_old中的
rosrun ORB_SLAM3 Stereo Vocabulary/ORBvoc.txt Examples_old/Stereo-Inertial/EuRoC.yaml true
```

EVO：

[https://blog.csdn.net/weixin_45834800/article/details/124587201](https://blog.csdn.net/weixin_45834800/article/details/124587201)

[https://blog.csdn.net/shanpenghui/article/details/109361766](https://blog.csdn.net/shanpenghui/article/details/109361766)

[https://blog.csdn.net/Barry_123/article/details/111314709](https://blog.csdn.net/Barry_123/article/details/111314709)

  

## ROS 运行方法

### 1.单目

```shell
rosrun ORB_SLAM3 Mono PATH_TO_VOCABULARY PATH_TO_SETTINGS_FILE
```

### 2.双目

```shell
rosrun ORB_SLAM3 Stereo PATH_TO_VOCABULARY PATH_TO_SETTINGS_FILE ONLINE_RECTIFICATION
```

### 3.单目-惯性

```shell
rosrun ORB_SLAM3 Mono_Inertial PATH_TO_VOCABULARY PATH_TO_SETTINGS_FILE [EQUALIZATION]
```

### 4.双目-惯性

```shell
rosrun ORB_SLAM3 Stereo_Inertial PATH_TO_VOCABULARY PATH_TO_SETTINGS_FILE ONLINE_RECTIFICATION [EQUALIZATION]
```

`PATH_TO_VOCABULARY`：输入辞典文件

`PATH_TO_SETTINGS_FILE`：输入配置文件

`[EQUALIZATION]`：将 CLAHE 均衡应用于图像（主要针对 TUM-VI 数据集）

### 运行方法

在终端上打开 3 个选项卡，然后在每个选项卡上运行以下命令以进行立体惯性配置：

```shell
roscore
```

```shell
rosrun ORB_SLAM3 Stereo_Inertial Vocabulary/ORBvoc.txt Examples/Stereo-Inertial/EuRoC.yaml true
```

```shell
rosbag play --pause V1_02_medium.bag /cam0/image_raw:=/camera/left/image_raw /cam1/image_raw:=/camera/right/image_raw /imu0:=/imu
```

ORB-SLAM3 加载词汇后，在 rosbag 选项卡中按空格键。

  

### ROS运行后不生成轨迹文件：

打开 `RB_SLAM3/Examples/ROS/ORB_SLAM3/src` 中的源代码，在main函数最后插入以下内容（斜杠包裹部分）：

```C++
...

    ros::spin();

//////////////////////////////////////////////////////////////
    // Stop all threads
    SLAM.Shutdown();

    // Save camera trajectory
    SLAM.SaveKeyFrameTrajectoryTUM("KeyFrameTrajectory_TUM_Format.txt");
    SLAM.SaveTrajectoryTUM("FrameTrajectory_TUM_Format.txt");
    SLAM.SaveTrajectoryKITTI("FrameTrajectory_KITTI_Format.txt");

    ros::shutdown();
//////////////////////////////////////////////////////////////

    return 0;
}

...
```

  

## EVO 安装使用

项目地址：

https://github.com/MichaelGrupp/evo

安装：

```shell
pip install evo --upgrade --no-binary evo

# 可能需要：
# 安装 pip
sudo apt install python3-pip
# 添加环境变量
vim ~/.bashrc
export PATH=$PATH:~/.local/bin # 添加到最后一行
```

使用：

使用 setup.py 或从 pip 安装后，可以从命令行全局调用以下可执行文件：

**指标：**

- `evo_ape` - 绝对姿势误差
- `evo_rpe` - 相对姿势误差

**工具：**

- `evo_traj` - 用于分析、绘制或导出一个或多个轨迹的工具
- `evo_res` - 用于比较来自或 `evo_rpe` 的 `evo_ape` 一个或多个结果文件的工具
- `evo_fig` - （实验性）工具，用于重新打开序列化的绘图（保存为 `-serialize_plot` ）
- `evo_config` - 用于全局设置和配置文件操作的工具

调用命令 with `--help` 以查看选项，例如 `evo_ape --help` .命令行参数的制表符补全在类 UNIX 系统上可用。

更多文档 查看 GitHub 上的 Wiki：[https://github.com/MichaelGrupp/evo/wiki](https://github.com/MichaelGrupp/evo/wiki)

```shell
# 使用 evo 自带的例子
# 1.绘制多个轨迹
cd test/data
evo_traj kitti KITTI_00_ORB.txt KITTI_00_SPTAM.txt --ref=KITTI_00_gt.txt -p --plot_mode=xz
# 2.对轨迹运行指标分析
# ORB
mkdir results
evo_ape kitti KITTI_00_gt.txt KITTI_00_ORB.txt -va --plot --plot_mode xz --save_results results/ORB.zip
# S-PTAM
evo_ape kitti KITTI_00_gt.txt KITTI_00_SPTAM.txt -va --plot --plot_mode xz --save_results results/SPTAM.zip
# 3.处理来自指标分析的多个结果
evo_res results/*.zip -p --save_table results/table.csv

# 【报错】在运行 evo_res 时报错 [ERROR] evo module evo.main_traj crashed - no logfile written (disabled)
# 更新 matplotlib 库即可，参考 https://blog.csdn.net/qq_33733356/article/details/106969109
pip install matplotlib --upgrade
```

  

### 评价指标

`APE`：绝对轨迹误差

`max`：最大值

`min`：最小值

`median`：中值

`mean`：均值

`rmse`：均方根，回归系统的拟合标准差

`std`：标准差，方差的开根号，表示数据集中数据点的离散程度

`sse`：和方差，拟合数据和原始数据对应点的误差的平方和

  

```Shell
evo_ape tum FrameTrajectory_TUM_Format.txt gt.tum -p -s -a -v
```

```Shell
rosrun ORB_SLAM3 Stereo_Inertial ../Vocabulary/ORBvoc.txt ../Examples_old/Stereo-Inertial/EuRoC.yaml true true
rosbag play --pause ~/文档/Dataset/Euroc/V101.bag /cam0/image_raw:=/camera/left/image_raw /cam1/image_raw:=/camera/right/image_raw /imu0:=/imu

rosrun ORB_SLAM3 Stereo ../Vocabulary/ORBvoc.txt ../Examples_old/Stereo/EuRoC.yaml true
rosbag play --pause ~/文档/Dataset/Euroc/V101.bag /cam0/image_raw:=/camera/left/image_raw /cam1/image_raw:=/camera/right/image_raw

rosrun ORB_SLAM3 Mono ../Vocabulary/ORBvoc.txt ../Examples_old/Monocular/EuRoC.yaml
rosbag play --pause ~/文档/Dataset/Euroc/V101.bag /cam0/image_raw:=/camera/image_raw

rosrun ORB_SLAM3 Mono_Inertial ../Vocabulary/ORBvoc.txt ../Examples_old/Monocular-Inertial/EuRoC.yaml true
rosbag play --pause ~/文档/Dataset/Euroc/V101.bag /cam0/image_raw:=/camera/image_raw /imu0:=/imu

rosrun ORB_SLAM3 Stereo ../Vocabulary/ORBvoc.txt ardvo_set/s.yaml false
rosbag play --pause '/media/ottoli/F02_4T_重要资料/ARD-VO/Processed/Vynrd B/01_Sep_2021/2021-09-01-10-49-44_clean.bag'  /flir_adk/front/left/image_raw:=/camera/left/image_raw /flir_adk/front/right/image_raw:=/camera/right/image_raw

rosrun ORB_SLAM3 Mono ../Vocabulary/ORBvoc.txt ardvo_set/m.yaml
rosbag play --pause '/media/ottoli/F02_4T_重要资料/ARD-VO/Processed/Vynrd B/01_Sep_2021/2021-09-01-10-49-44_clean.bag'  /flir_adk/front/left/image_raw:=/camera/image_raw

rosrun ORB_SLAM3 Mono_Inertial ../Vocabulary/ORBvoc.txt ardvo_set/mi.yaml true
rosbag play --pause '/media/ottoli/F02_4T_重要资料/ARD-VO/Processed/Vynrd B/01_Sep_2021/2021-09-01-10-49-44_clean.bag'  /flir_adk/front/left/image_raw:=/camera/image_raw /gps/duro/imu:=/imu
```