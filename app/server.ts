// if (process.env.TRACE) {
//     require('./libs/trace');
// }
import config from 'config';
import _log from './utils/logger';
import Koa, { Context } from 'koa';
import ApiRouter from './router';

import compose from "koa-compose";
import convert from "koa-convert";
import logger from "koa-logger";
import helmet from "koa-helmet";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import cookie from "koa-cookie";
import templates from './middleware/templates';
import { Sequelize } from 'sequelize-typescript';

import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';
import Router from 'koa-router';
import IndexRoute from './routes/IndexRoute';

// @see https://www.npmjs.com/package/koa-i18n
// @see https://github.com/jeresig/i18n-node-2
const locale = require('koa-locale'); //  detect the locale
const i18n = require('koa-i18n');

// const app = new Koa();
const log = _log(module);

export default class Server {
    public app: Koa;
    private model;

    private db: Sequelize;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.model = Object();
        this.app = new Koa();
        this.initdb();
        this.middleware();
        this.api();
        this.routes();
    }

    private initdb() {
        const connectParams: SequelizeConfig = {
            database: config.get('db.database'),
            username: config.get('db.username'),
            password: config.get('db.password'),
            host: config.get('db.host'),
            dialect: 'mysql',
            logging: config.get('dbParams.logging'),
            benchmark: config.get('dbParams.benchmark'),
            pool: config.get('dbParams.pool'),
            port: config.get('dbParams.port'),
            modelPaths: [__dirname + '/models']
        };

        this.db = new Sequelize(connectParams);
        this.db.authenticate();
    }

    public middleware() {
        this.app.keys = config.get('secret');
        locale(this.app, 'en-US');

        this.app.use(i18n(this.app, {
            directory: './locale',
            locales: ['en-US', 'ru-RU'],
            defaultLocale: 'en-En',
            modes: [
                'header'
            ],
            mappings: {
                'en-US': 'en-EN'
            },
            rewrite: false
        }));

        this.app.use(logger());
        this.app.use(helmet());
        this.app.use(convert(cors({
            exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
            credentials: true,
            allowMethods: ["GET", "POST", "DELETE"],
            allowHeaders: ["Content-Type", "Authorization", "Accept"],
        })));
        this.app.use(bodyParser());
        this.app.use(cookie());
        this.app.use(templates());


        //empty for now
    }

    public api() {
        console.info('api');
        //empty for now
    }

    public routes() {
        console.info('routes');
        let router: Router;
        router = new Router();

        IndexRoute.create(router);

        this.app.use(router.routes());

        // this.app.use(async function (ctx) {
        //     ctx.body = 'Hello World';
        // });
        console.info('routes');
        //empty for now
    }
}
