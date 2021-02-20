/**
 * @module "BackupMode" class
 * @description Enumerates backup modes
 * @version 0.0.1 (2021-02-20)
 */
include("/general/javaScript");

class BackupMode {
    static get none() { return "none"; }
    static get line() { return "line"; }
    static get file() { return "file"; }

    static parse(pString) {
        const string = pString ? pString.trim().toLowerCase() : "";
        let value = "";
        if (string)
            switch (string) {
                case "line":
                    value = BackupMode.line;
                    break;
                case "file":
                    value = BackupMode.file;
                    break;
                case "":
                case "none":
                    value = BackupMode.none;
                    break;
                default:
                    throw new Error(`Unknown backup mode: ${pString}.`);
                    break;
            }
        return value;
    }
}

module.exports = BackupMode;