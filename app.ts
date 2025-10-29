import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});

import Koa from "koa";
import config from "@config/index";
import render from "koa-swig";
import serve from "koa-static";
import co from "co";
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import ErrorHandle from "@middlewares/ErrorHandle";
import { configure, getLogger } from "log4js";
import { historyApiFallback } from "koa2-connect-history-api-fallback";

// IOC容器
const container = createContainer();
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});


/**
 * 日志
 * 📢注意事项：如果服务需要部署到AWS上
 *  - 日志文件、下载文件的地址不能随意修改，有专门指定的地方
 */
configure({
  appenders: {
    cheese: { type: "file", filename: `${__dirname}/logs/nezha.log` },
  },
  categories: {
    default: { appenders: ["cheese"], level: "error" },
  },
});

// 创建 Koa 实例
const app = new Koa();
const { port, viewDir, memoryFlag, staticDir } = config;

// 配置 koa-swig
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: memoryFlag,
    ext: "html",
    writeBody: false,
  })
);

// 静态资源服务
app.use(serve(staticDir));

// 每一次用户请求router 都会从容器中渠道注入的服务
app.use(scopePerRequest(container));

// 错误处理
const logger = getLogger();
ErrorHandle.error(app, logger);

// koa中没有实现的路由重定向到index.html
app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));

// 让所有的路由全部生效
app.use(loadControllers(`${__dirname}/routers/*.ts`));

if (process.env.NODE_ENV === "development") {
  // 启动服务器
  app.listen(port, () => {
    console.log(`服务器启动在 ${port} 端口`);
  });
}

export default app;
