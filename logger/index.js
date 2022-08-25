const { format, createLogger, transports } = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
//const winston = require('winston/lib/winston/config');
const { combine, json, printf } = format;

const errorFilter = format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const fileRotateTransportOne = new winstonDailyRotateFile({
    filename: './data/app-error-%DATE%.json',
    level: 'error',
    datePattern: 'DD-MM-YYYY',
    maxFiles: '1d',
    format: combine(
        json()
    )
})

const fileRotateTransportTwo = new winstonDailyRotateFile({
    filename: './data/app-info-%DATE%.json',
    level: 'info',
    datePattern: 'DD-MM-YYYY',
    maxFiles: '1d',
    format: combine(
        json()
    )
})

const logger = createLogger({
    //level: 'error',
    format: combine(
        format.timestamp({ format: 'DD-MM-YYYY-HH-MM-SS' }),
        format.errors({ stack: true }),
        //format.info({ stack: true }),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        fileRotateTransportOne,
        fileRotateTransportTwo
    ]
})

module.exports = logger