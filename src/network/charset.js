/**
 * @module "Charset" class
 * @description Enumerates charsets
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class Charset {
    static get ascii() { return "ASCII"; }
    static get ansi() { return "ANSI"; }
    static get iso88591() { return "ISO-8859-1"; }
    static get windows1252() { return "Windows-1252"; }
    static get utf8() { return "UTF-8"; }

    static get items() { return [
        new EnumItem(Charset.utf8, "utf-8"),
        new EnumItem(Charset.ascii, "ascii"),
        new EnumItem(Charset.ansi, "ansi"),
        new EnumItem(Charset.iso88591, "iso-8859-1"),
        new EnumItem(Charset.windows1252, "windows-1252")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, Charset.items, Charset.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, Charset.items, Charset.name);
    }
}
