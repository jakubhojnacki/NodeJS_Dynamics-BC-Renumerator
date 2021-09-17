/**
 * @module "BackupMode" class
 * @description Enumerates backup modes
 * @version 0.0.1 (2021-02-20)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class BackupMode {
    static get none() { return "none"; }
    static get file() { return "file"; }
    static get line() { return "line"; }

    static get items() { return [
        new EnumItem(BackupMode.none),
        new EnumItem(BackupMode.file),
        new EnumItem(BackupMode.line)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, BackupMode.items, BackupMode.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, BackupMode.items, BackupMode.name);
    }
}
