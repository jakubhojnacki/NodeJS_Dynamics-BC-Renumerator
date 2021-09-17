/**
 * @module "RegExpFlag" class (static)
 * @description Enumerates regular expression flags
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class RegExpFlag {
    static get globalMatch() { return "g"; }
    static get ignoreCase() { return "i"; }
    static get multiline() { return "m"; }
    static get dotAll() { return "s"; }
    static get unicode() { return "u"; }
    static get sticky() { return "y"; }

    static get items() { return [
        new EnumItem(RegExpFlag.globalMatch, "g"),
        new EnumItem(RegExpFlag.ignoreCase, "i"),
        new EnumItem(RegExpFlag.multiline, "m"),
        new EnumItem(RegExpFlag.dotAll, "s"),
        new EnumItem(RegExpFlag.unicode, "u"),
        new EnumItem(RegExpFlag.sticky, "y")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, RegExpFlag.items, RegExpFlag.name);
    }    

    static toString(pValue) {
        return Enum.toString(pValue, RegExpFlag.items, RegExpFlag.name);
    }    
}
