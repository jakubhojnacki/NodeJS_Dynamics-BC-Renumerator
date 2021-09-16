/**
 * @module "EndOfLineType" class (static)
 * @description Enumeration of end-of-line types
 * @version 0.0.1 (2021-02-23)
 */

import "./javaScript.js";
import Enum from "./enum.js";

export default class EndOfLineType {
    static get linux() { return "linux"; }
    static get windows() { return "windows"; }

    static get values() { return [
        EndOfLineType.linux,
        EndOfLineType.windows
    ]; }

    static parse(pString) {
        return Enum.parse(pString, EndOfLineType.values, EndOfLineType.name);
    }    

    static toString(pEndOfLineType) {
        let result = "";
        switch (pEndOfLineType) {
            case "":
            case EndOfLineType.linux:
                result = "\n";
                break;
            case EndOfLineType.windows:
                result = "\r\n";
                break;
        }
        return result;
    }    
}
