/**
 * @module "BackupMode" class
 * @description Enumerates backup modes
 * @version 0.0.1 (2021-02-20)
 */

require("./javaScript");

const Enum = require("./enum");
const EnumValue = require("./enumValue");

/*static*/ class BackupMode {
    static get file() { return "file"; }
    static get line() { return "line"; }
    static get none() { return "none"; }

    static get values() { return [
        new EnumValue(BackupMode.file),
        new EnumValue(BackupMode.line),
        new EnumValue(BackupMode.none, true)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, BackupMode.values, BackupMode.name);
    }
}

module.exports = BackupMode;