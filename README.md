# 微信小程序学习项目

一个用于学习和演示微信小程序开发的示例项目，涵盖常用组件、数据绑定、事件处理等核心功能。

## 项目简介

本项目是一个微信小程序入门示例，展示了小程序开发的基础知识和常见开发模式，适合初学者参考学习。

## 功能页面

| 页面 | 描述 |
|------|------|
| **首页 (first)** | 核心演示页，包含数据绑定、列表渲染、条件渲染、表单输入、轮播图、图片组件等 |
| **个人中心 (index)** | 用户头像选择、昵称输入，演示微信授权 API 的使用 |
| **日志 (logs)** | 展示应用启动历史记录，演示本地存储的读写 |
| **时钟 (clock)** | 时钟功能页（开发中） |
| **发现 (fire)** | 发现功能页（开发中） |
| **主页 (home)** | 主页（开发中） |

## 演示功能

- **数据绑定**：字符串、数字、列表的动态渲染
- **列表渲染**：`wx:for` 自定义列表项名称与索引
- **条件渲染**：`wx:if / wx:elif / wx:else`
- **事件处理**：按钮点击、输入框双向绑定
- **组件展示**：
  - `<button>`：多种样式（primary、warn、mini、plain）
  - `<image>`：多种裁剪模式（aspectFit、aspectFill、widthFix、heightFix）
  - `<swiper>`：自动播放轮播图
  - `<scroll-view>`：横向/纵向滚动视图
  - `<rich-text>`：富文本渲染
- **用户授权**：头像选择、昵称获取
- **本地存储**：应用日志记录与读取
- **微信登录**：`wx.login` 接口调用

## 技术栈

- **平台**：微信小程序
- **框架**：原生微信小程序框架（glass-easel）
- **语言**：JavaScript (ES6+)、WXML、WXSS
- **开发工具**：微信开发者工具

## 项目结构

```
Wechat_MiniPro/
├── app.js              # 应用入口，全局逻辑
├── app.json            # 全局配置（页面、导航栏、底部 tabBar）
├── app.wxss            # 全局样式
├── pages/              # 页面目录
│   ├── first/          # 首页（核心演示）
│   ├── index/          # 个人中心
│   ├── logs/           # 启动日志
│   ├── clock/          # 时钟页
│   ├── fire/           # 发现页
│   └── home/           # 主页
├── utils/
│   └── util.js         # 工具函数（时间格式化）
├── assets/
│   └── icon/           # tabBar 图标
└── images/             # 演示用图片资源
```

## 快速开始

1. 克隆本仓库：
   ```bash
   git clone https://github.com/li-yhhq/wechat_minipro.git
   ```

2. 使用 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 打开项目目录。

3. 在开发者工具中填入自己的 AppID，或使用测试号运行。

4. 点击「编译」即可在模拟器中预览。

## 注意事项

- 运行前需在 `project.config.json` 中替换 `appid` 为自己的小程序 AppID。
- 部分功能（如头像选择、微信登录）需在真机上测试或开启开发者工具的相关权限。
