/**
 * @module "FileLogger" class
 * @description Logs application messages to a file
 * @version 0.0.1 (2021-02-17)
 */

const fs = require("fs");
const Logger = require("./logger");
const LoggerType = require("./loggerType");
require("./javaScript");

class FileLogger extends Logger {
    get type() { return LoggerType.file; }
    get file() { return this.mFile; }

    constructor(pFilePath, pWidth) {
        super(pWidth);
        this.mFile = fs.createWriteStream(pFilePath);
    }

    log(pText) {
        this.file.write(pText + "\r\n");
    }

    dispose() {
        this.file.end();
    }
}

module.exports = FileLogger;