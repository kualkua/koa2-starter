const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const dbFile = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
const configDatabase = dbFile[env];
const defer = require('config/defer').deferConfig;
const path = require('path');
module.exports = {
    // fakeUserId: process.env.NODE_ENV === 'production' ? false : 17443,
    fakeUserId: false,
    server: {
        port: 8080
    },
    env: env,
    db: configDatabase,
    dbParams: {
        dialect: 'mysql',
        port: 3306,
        pool: {
            max: 1,
            idle: 10000
        },
        logging: process.env.NODE_ENV !== 'production',
	    benchmark: process.env.NODE_ENV !== 'production'
    },
    secret: ['some secret word'],
    root: process.cwd(),
    finance: {
        precision: 9
    },
    whiteListIps: [],
    redis: {
        host: 'localhost',
        port: 6379,
        password: '',
        db: 0,
    },
    cache: require('./cache'),
    template: {
        // template.root uses config.root
        root: defer(function(cfg) {
            return path.join(cfg.root, 'templates');
        })
    }
};