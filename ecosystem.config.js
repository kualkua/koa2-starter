const argv = require('yargs').argv
const env = argv.env ? argv.env.toString() : 'development'

let LOGLEVEL = 'warning';
let LOGFILE = "/dev/null";
let OUTFILE = "/dev/null";
let ERRORFILE = "/dev/null";

if (env == 'development') {
    LOGLEVEL = "tracing";
    LOGFILE = "../logs/combined.outerr.log";
    OUTFILE =  "../logs/out.log";
    ERRORFILE = "../logs/err.log";
} else if (argv.env == 'staging') {
    LOGLEVEL = "fatal";
    // LOGFILE = "../../../logs/combined.outerr.log";
    OUTFILE =  "../../../logs/out.log";
    ERRORFILE = "../../../logs/err.log";
} else { //prod
    LOGLEVEL = "warning",
    LOGFILE = "../../../logs/combined.outerr.log";
    OUTFILE =  "../../../logs/out.log";
    ERRORFILE = "../../../logs/err.log";
};

const params = {
    exec_mode: env == 'production' ?  "cluster" : "fork",
    max_memory_restart: "1G",
    log_file: LOGFILE,
    out_file: OUTFILE,
    error_file: ERRORFILE,
    logLevel: LOGLEVEL,
    exec_interpreter: env == 'production' ?  "node" : env == 'staging' ? "./../../../node_modules/.bin/ts-node" : "./../node_modules/.bin/ts-node",
    source_map_support: true,
    cwd: env == 'production' ?  './dist' : "./app",
    PM2_GRACEFUL_LISTEN_TIMEOUT: 1000,
    PM2_GRACEFUL_TIMEOUT: 5000,
    ignore_watch: [
        "node_modules",
        '.idea',
        'logs',
        "templates",
        "public",
        'tests',
        'locales'
    ],
    watch_options: {
        "followSymlinks": true
    },
    // node_args: "--inspect", //if you want to debug
    // node_args: "--prof", //if you want to profile
    env: {
        "watch": true,
        "ASSET_VERSIONING": "file",
        "NODE_ENV": "development",
        "NODE_PATH": "./:../node_modules",
    },
    env_production: {
        "watch": false,
        "LOGLEVEL": "warning",
        "NODE_ENV": "production"
    },
    env_staging: {
        "NODE_ENV": "staging"
    }
}

module.exports = {
    apps: [
        {
            name: "dates",
            script: env == 'production' ? "./bin/index.js" : "./bin/index.ts", //normal mode
            instances: env == 'production' ?  2 : 1,
            ...params
        }
    ]
};