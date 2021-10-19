/**
 * @module "ArgName" class
 * @description Class representing argument names
 */

"use strict";

import { Enum } from "core-library";
import { EnumItem } from "core-library";

export class ArgName {
    static get directoryPath() { return "DirectoryPath"; }
    static get settings() { return "Settings"; }
    static get debug() { return "Debug"; }
    static get debugDirectoryPath() { return "DebugDirectoryPath"; }

    static get items() { return [
        new EnumItem(ArgName.directoryPath),
        new EnumItem(ArgName.settings),
        new EnumItem(ArgName.debug),
        new EnumItem(ArgName.debugDirectoryPath)
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ArgName.items, ArgName.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, ArgName.items, EndOfLineType.name);
    }
}
