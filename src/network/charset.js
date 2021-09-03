/**
 * @module "Charset" class
 * @description Enumerates charsets
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

export default class Charset {
    static get ascii() { return "ASCII"; }
    static get ansi() { return "ANSI"; }
    static get iso88591() { return "ISO-8859-1"; }
    static get windows1252() { return "Windows-1252"; }
    static get utf8() { return "UTF-8"; }

    static get items() { return [
        Charset.utf8,
        Charset.ascii,
        Charset.ansi,
        Charset.iso88591,
        Charset.windows1252
    ]; }

    static parse(pString) {
        return Enum.parse(pString, Charset.items, Charset.name);
    }

    static toString(pValue) {
        let string = "";
        switch (pValue) {
            case Charset.utf8:
                string = "utf-8";
                break;
            case Charset.ascii:
                string = "ascii";
                break;
            case Charset.ansi:
                string = "ansi";
                break;
            case Charset.iso88591:
                string = "iso-8859-1";
                break;
            case Charset.windows1252:
                string = "windows-1252";
                break;
        }
        return string;
    }
}
