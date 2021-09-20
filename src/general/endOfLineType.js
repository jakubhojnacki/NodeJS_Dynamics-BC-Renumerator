/**
 * @module "EndOfLineType" class (static)
 * @description Enumeration of end-of-line types
 * @version 0.0.1 (2021-02-23)
 */

import "./javaScript.js";
import Enum from "./enum.js";
import EnumItem from "./enumItem.js";

export default class EndOfLineType {
    static get linux() { return "linux"; }
    static get windows() { return "windows"; }

    static get items() { return [
        new EnumItem(EndOfLineType.linux, "\n"),
        new EnumItem(EndOfLineType.windows, "\r\n")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, EndOfLineType.items, EndOfLineType.name);
    }    

    static toString(pValue) {
        return Enum.toString(pValue, EndOfLineType.items, EndOfLineType.name);
    }    
}
