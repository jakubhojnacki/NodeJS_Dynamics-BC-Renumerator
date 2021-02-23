/**
 * @module "EndOfLineType" class (static)
 * @description Enumeration of end-of-line types
 * @version 0.0.1 (2021-02-23)
 */

require("./javaScript");

const Enum = require("./enum");
const EnumValue = require("./enumValue");

/*static*/ class EndOfLineType {
    static get linux() { return "linux"; }
    static get windows() { return "windows"; }

    static get values() { return [
        new EnumValue(EndOfLineType.linux, true),
        new EnumValue(EndOfLineType.windows)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, EndOfLineType.values, EndOfLineType.name);
    }    

    static get(pEndOfLineType) {
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

module.exports = EndOfLineType;