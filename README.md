# 亚思睿博会务系统 - 前端

## 项目介绍

这是亚思睿博会务系统的 UniApp 前端项目，支持打包成：
- 📱 iOS/Android APP
- 💬 微信小程序
- 🌐 H5 Web 应用

## 技术栈

- **框架**：Vue 3 + UniApp
- **UI 库**：uni-ui + uview-plus
- **HTTP 客户端**：Axios
- **构建工具**：Vite
- **状态管理**：Pinia

## 项目结构

```
src/
├── api/                    # API 接口
│   ├── project.js         # 项目相关接口
│   └── request.js         # 请求配置
├── store/                  # 状态管理
│   └── project.js         # 项目状态
├── utils/                  # 工具函数
│   └── common.js          # 通用工具
pages/
├── index/                  # 首页
│   └── index.vue
├── project/                # 项目相关页面
│   ├── create.vue         # 创建项目
│   ├── detail.vue         # 项目详情
│   └── edit.vue           # 编辑项目
├── requirement/            # 需求相关页面
│   └── list.vue           # 需求列表
├── itinerary/              # 行程相关页面
│   └── list.vue           # 行程列表
├── finance/                # 财务相关页面
│   └── detail.vue         # 财务详情
└── user/                   # 用户相关页面
    └── profile.vue        # 个人中心

static/                     # 静态资源
main.js                     # 应用入口
App.vue                     # 根组件
pages.json                  # 页面配置
manifest.json              # 应用配置
```

## 功能页面

### 1. 首页 (pages/index/index.vue)
- 项目列表展示
- 按状态展示项目信息
- 快速创建项目
- 点击进入项目详情

### 2. 项目管理
- **创建项目** (pages/project/create.vue)
  - 填写项目基本信息
  - 选择项目日期
  - 设置项目预算
  - 选择初始状态

- **项目详情** (pages/project/detail.vue)
  - 查看项目完整信息
  - 编辑项目
  - 删除项目

- **编辑项目** (pages/project/edit.vue)
  - 修改项目信息
  - 更新项目状态

### 3. 需求管理 (pages/requirement/list.vue)
- 显示项目的所有需求
- 需求类型展示
- 需求确认状态

### 4. 行程安排 (pages/itinerary/list.vue)
- 按日期展示行程
- 显示具体时间段
- 活动内容记录

### 5. 财务统计 (pages/finance/detail.vue)
- 项目预算信息
- 收款情况
- 成本统计
- 利润计算

### 6. 个人���心 (pages/user/profile.vue)
- 用户信息
- 系统设置
- 关于应用

## 快速开始

### 1. 环境要求
- Node.js 14+
- npm 或 yarn

### 2. 安装依赖

```bash
npm install
```

### 3. 开发

#### Web 开发
```bash
npm run dev:h5
```
访问 `http://localhost:8081`

#### APP 开发
```bash
npm run dev:app
```

#### 小程序开发
```bash
npm run dev:mp-weixin
```

### 4. 构建

#### 构建 H5
```bash
npm run build:h5
```

#### 构建 APP
```bash
npm run build:app
```

#### 构建小程序
```bash
npm run build:mp-weixin
```

## API 接口配置

编辑 `vite.config.js` 配置 API 代理：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path
    }
  }
}
```

## 页面导航

### Tab Bar 菜单
- 首页：项目列表
- 需求：需求管理
- 财务：财务统计
- 我的：个人中心

### 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | /pages/index/index | 项目列表 |
| 创建项目 | /pages/project/create | 新建项目表单 |
| 项目详情 | /pages/project/detail | 查看项目详情 |
| 编辑项目 | /pages/project/edit | 编辑项目信息 |
| 需求列表 | /pages/requirement/list | 项目需求 |
| 行程列表 | /pages/itinerary/list | 项目行程 |
| 财务详情 | /pages/finance/detail | 财务统计 |
| 个人中心 | /pages/user/profile | 用户信息 |

## 样式规范

### 颜色定义
- 主色：#007AFF
- 成功：#6CC51F
- 危险：#FF3B30
- 警告：#FF9500
- 文字主色：#333333
- 文字副色：#666666
- 文字辅助色：#999999
- 分割线：#EEEEEE

### 字体大小
- 标题：18px (bold)
- 标题 2：16px (bold)
- 正文：14px
- 标签：12px
- 辅助：13px

## 状态管理

使用 Pinia 管理全局状态，主要包括：

- **projectStore**
  - projects: 项目列表
  - currentProject: 当前项目
  - loading: 加载状态
  - error: 错误信息

## 工具函数

### common.js
- `formatDate(date, format)` - 日期格式化
- `formatCurrency(value)` - 货币格式化
- `debounce(fn, delay)` - 防抖
- `throttle(fn, delay)` - 节流

## HTTP 请求

所有 API 请求通过 `src/api/request.js` 统一处理：

```javascript
import request from '@/src/api/request';

request({
  url: '/projects',
  method: 'GET'
});
```

## 开发建议

1. **组件复用**：创建可复用的业务组件到 `components/` 目录
2. **API 管理**：所有 API 调用都要在 `src/api/` 下分类处理
3. **状态管理**：复杂数据状态使用 Pinia store
4. **工具函数**：常用的工具函数放在 `src/utils/` 下
5. **样式规范**：使用 scoped style 避免样式污染

## 打包发布

### APP 打包
1. 使用 HBuilderX 打开项目
2. 菜单 -> 发行 -> App(云端打包)
3. 选择 iOS 或 Android
4. 等待打包完成

### 小程序发布
1. 构建小程序：`npm run build:mp-weixin`
2. 使用微信开发者工具打开 dist/build/mp-weixin
3. 上传代码版本
4. 提交审核

## 常见问题

### Q: 如何修改 API 请求地址？
A: 编辑 `src/api/request.js` 中的 baseURL 或修改 `vite.config.js` 中的代理配置

### Q: 如何添加新页面？
A: 
1. 在 pages 目录下创建页面文件
2. 在 pages.json 中添加页面配置
3. 使用 uni.navigateTo() 进行页面跳转

### Q: 如何处理登录认证？
A: 在 `src/api/request.js` 的请求拦截器中添加 token

## 许可证

MIT
