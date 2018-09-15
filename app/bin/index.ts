// require('events').EventEmitter.prototype._maxListeners = 100;
process.setMaxListeners(100);

const config = require('config');
const normalizePort = require('normalize-port');

import _log from '../utils/logger';
const log = _log(module);
import Server from '../server';

const PORT = normalizePort(config.server.port || '8080');
const app = Server.bootstrap().app;

app.listen(PORT, () => {
    log.info(`☢️ 😱 App started on port ${PORT} with environment ${process.env.NODE_ENV}`);
});