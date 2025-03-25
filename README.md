# Nezha-BFF

一个基于 Koa2 + TypeScript 构建的 BFF (Backend For Frontend) 服务。

## 技术栈

- Koa2
- TypeScript
- Awilix (依赖注入)
- Swig (模板引擎)
- Log4js (日志管理)

## 项目结构

nezha-bff/
├── app.ts # 应用入口文件
├── config/ # 配置文件目录
├── services/ # 服务层
├── routers/ # 路由控制器
├── logs/ # 日志文件
└── typings/ # TypeScript 类型定义


## 开始使用

### 安装依赖

```bash
yarn
yarn dev
```

## 特性

- 🚀 TypeScript 支持
- 📦 依赖注入 (DI) 支持
- 🔄 开发环境热重载
- 📝 日志管理
- 🖥️ 支持 Serverless 部署
- 🎨 支持 SPA 历史模式
- 🗃️ 静态文件服务

## 环境要求

- Node.js >= 14.0.0
- TypeScript >= 4.0.0