import { Context } from "@interfaces/IKoa";
import Koa from "koa";
import { Logger } from "log4js";

class ErrorHandle {
  static error(app: Koa, logger: Logger) {
    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.body = "500——恢复中";
      }
    });

    app.use(async (ctx: Context, next: () => Promise<unknown>) => {
      await next();
      if (ctx.status !== 404) {
        return;
      }
      // 腾讯公益
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }
}

export default ErrorHandle;
