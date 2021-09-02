/**
 * @module "BackupMode" class
 * @description Enumerates backup modes
 * @version 0.0.1 (2021-02-20)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

export default class BackupMode {
    static get none() { return "none"; }
    static get file() { return "file"; }
    static get line() { return "line"; }

    static get values() { return [
        BackupMode.none,
        BackupMode.file,
        BackupMode.line
    ]; }

    static parse(pString) {
        return Enum.parse(pString, BackupMode.values, BackupMode.name);
    }
}
