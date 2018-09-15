const winston = require('winston');
import path from 'path';
import fs from 'fs';
// import Pm2IoNotifyTransport from './pm2-io-transport';

winston.emitErrs = true;

// const getFilePath = m => m.filename.split(path.sep).slice(-2).join(path.sep);

const getFilePath = function (m: any) {
    return m.filename.split(path.sep).slice(-2).join(path.sep);
};

let dirLog;

if (process.env && process.env.NODE_ENV && process.env.NODE_ENV.toString() == 'development' || !process.env.NODE_ENV) {
    dirLog = path.join(process.cwd(), '../logs');
} else {
    dirLog = path.join(process.cwd(), '../../../logs');
}

if (!fs.existsSync(dirLog)) {
    fs.mkdirSync(dirLog);
}


const exFilePath = path.join(dirLog, 'logger-exception.log');
const appFilePath = path.join(dirLog, 'logger-application.log');
const logMaxSize = 5242880; // 5mb

// Logging Levels
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

export default function logger(module: any) {
    return new (winston.Logger)({
        transports: [
            new winston.transports.File({
                name: 'file.error',
                level: 'error',
                label: getFilePath(module),
                filename: exFilePath,
                handleExceptions: true,
                humanReadableUnhandledException: true,
                json: false,
                maxSize: logMaxSize,
                colorize: false
            }),
            new winston.transports.File({
                name: 'file.info',
                level: 'info',
                label: getFilePath(module),
                filename: appFilePath,
                handleExceptions: false,
                json: false,
                maxSize: logMaxSize,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                label: getFilePath(module),
                handleExceptions: true,
                humanReadableUnhandledException: true,
                json: true,
                colorize: true,
                timestamp: true
            })
        ],
        exitOnError: false
    });
}


