import _log from "../utils/logger";
import { Context } from "koa";
const log = _log(module);

export default () => {
    return async (ctx: Context, next) => {
        const paramsIn = {
            headers: ctx.headers,
            params: ctx.params,
            query: ctx.request.query,
            post: ctx.request.body,
        };
        log.info("request", paramsIn);
        await next();
        const paramsOut = {
            body: ctx.body,
        };
        log.info("response", paramsOut);
    };
};
