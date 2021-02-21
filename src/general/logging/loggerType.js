/**
 * @module "LoggerType" class (static)
 * @description Enumerates logger types
 * @version 0.0.1 (2021-02-17)
 */

__require("/general/javaScript");

const Enum = __require("/general/enum");
const EnumValue = __require("/general/enumValue");

/*static*/ class LoggerType {
    static get console() { return "console"; }
    static get file() { return "file"; }

    static get values() { return [
        new EnumValue(LoggerType.console, true),
        new EnumValue(LoggerType.file)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, LoggerType.values, LoggerType.name);
    }
}

module.exports = LoggerType;