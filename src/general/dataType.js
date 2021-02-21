/**
 * @module "DataType" class (static)
 * @description Enumeratos and manages data types
 * @version 0.0.2 (2021-02-19)
 */

__require("general/javaScript");
const Enum = __require("general/enum");
const EnumValue = __require("general/enumValue");

/*static*/ class DataType {
    static get boolean() { return "boolean"; }
    static get integer() { return "integer"; }
    static get float() { return "float"; }
    static get string() { return "string"; }
    static get date() { return "date"; }

    static get values() { return [
        new EnumValue(DataType.boolean),
        new EnumValue(DataType.integer),
        new EnumValue(DataType.float),
        new EnumValue(DataType.string, true),
        new EnumValue(DataType.date)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DataType.values, DataType.name);
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