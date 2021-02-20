/**
 * @module "ConsoleLogger" class
 * @description Logs application messages to a console
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

const LoggerType = include("/general/logging/loggerType");
const TextLogger = include("/general/logging/logger");

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