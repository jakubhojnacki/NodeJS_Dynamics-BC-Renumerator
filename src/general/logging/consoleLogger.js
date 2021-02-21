/**
 * @module "ConsoleLogger" class
 * @description Logs application messages to a console
 * @version 0.0.1 (2021-02-17)
 */

__require("/general/javaScript");

const LoggerType = __require("/general/logging/loggerType");
const TextLogger = __require("/general/logging/logger");

class ConsoleLogger extends TextLogger {
    get type() { return LoggerType.console; }

    constructor(pWidth, pTab) {
        super(pWidth, pTab);
    }

    log(pText) {
        console.log(pText);
    }

    dispose() {
    }
}

module.exports = ConsoleLogger;