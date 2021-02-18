/**
 * @module "LoggerType" class (static)
 * @description Enumerates logger types
 * @version 0.0.1 (2021-02-17)
 */

/*static*/ class LoggerType {
    static get console() { return "console"; }
    static get file() { return "file"; }

    static parse(pString) {
        const string = pString ? pString.trim().toLowerCase() : "";
        let value = "";
        if (string)
            switch (string) {
                case "console":
                    value = LoggerType.console;
                    break;
                case "file":
                    value = LoggerType.file;
                    break;
                default:
                    throw new Error(`Unknown logger type: ${pString}.`);
                    break;
            }
        return value;
    }
}

module.exports = LoggerType;