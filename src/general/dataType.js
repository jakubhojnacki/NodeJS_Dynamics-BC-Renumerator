/**
 * @module "DataType" class (static)
 * @description Enumeratos and manages data types
 * @version 0.0.2 (2021-02-19)
 */

include("/general/javaScript");

/*static*/ class DataType {
    static get boolean() { return "boolean"; }
    static get integer() { return "integer"; }
    static get float() { return "float"; }
    static get string() { return "string"; }
    static get date() { return "date"; }

    static parse(pString) {
        const string = pString ? pString.trim().toLowerCase() : "";
        let value = "";
        if (string)
            switch (string) {
                case "boolean":
                    value = DataType.boolean;
                    break;
                case "integer":
                    value = DataType.integer;
                    break;
                case "float":
                    value = DataType.float;
                    break;
                case "string":
                    value = DataType.string;
                    break;
                case "date":
                    value = DataType.date;
                    break;
                default:
                    throw new Error(`Unknown data type: ${pString}.`);
                    break;
            }
        return value;
    }

    static parseValue(pString, pDataType) {
        let value = null;
        switch (pDataType) {
            case DataType.boolean:
                value = Boolean.tryToParse(pString);
                break;
            case DataType.integer:
                value = Number.tryToParseInt(pString);
                break;
            case DataType.float:
                value = Number.tryToParseFloat(pString);
                break;
            case DataType.date:
                value = Date.tryToParse(pString);
                break;
            case "":
            case DataType.string:
                value = pString;
                break;
            default:
                throw new Error(`Unhandled data type: ${pDataType}.`);
        }
        return value;
    }
}

module.exports = DataType;