import _log from '../utils/logger';

const log = _log(module);

export default function () {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            log.error(error.message, error);
            ctx.status = error.status || 500;
            ctx.body = {
                error: error.message
            };
            ctx.app.emit('error', error, ctx);
        }
    }
};