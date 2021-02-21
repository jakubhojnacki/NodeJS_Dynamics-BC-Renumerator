/**
 * @module "LoggerFactory" class (static)
 * @description Class responsible for creating loggers
 * @version 0.0.1 (2021-02-17)
 */

const ConsoleLogger = __require("general/logging/consoleLogger");
const FileLogger = __require("general/logging/fileLogger");
const LoggerType = __require("general/logging/loggerType");

/*static*/ class LoggerFactory {
    static create(pLoggerType, pLoggerFilePath) {
        let logger = null;
        const loggerType = LoggerType.parse(pLoggerType);
        switch (loggerType) {
            case LoggerType.console:
                logger = new ConsoleLogger();
                break;
            case LoggerType.file:
                logger = new FileLogger(pLoggerFilePath);
                break;
            default:
                throw new Error(`Logger type ${pLoggerType} is not supported by logger factory.`);
        }
        return logger;
    }
}

module.exports = LoggerFactory;