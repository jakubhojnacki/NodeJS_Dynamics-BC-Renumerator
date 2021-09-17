/**
 * @module "ArgName" class
 * @description Class representing argument names
 * @version 0.0.3 (2021-08-10)
 */

import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class ArgName {
    static get directoryPath() { return "DirectoryPath"; }
    static get settings() { return "Settings"; }
    static get debugMode() { return "DebugMode"; }

    static get items() { return [
        new EnumItem(ArgName.directoryPath),
        new EnumItem(ArgName.settings),
        new EnumItem(ArgName.debugMode)
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ArgName.items, ArgName.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, ArgName.items, EndOfLineType.name);
    }
}
