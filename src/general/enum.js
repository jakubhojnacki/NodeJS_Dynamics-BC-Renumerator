/**
 * @module "Enum" class
 * @description Enum helper class (static)
 * @version 0.0.1 (2021-02-21)
 */

__require("/general/javaScript");

/*static*/ class Enum {
    static parse(pString, pEnumValues, pEnumName, pDefaultValue) {
        const string = pString ? pString.trim().toLowerCase() : "";
        let result = false;
        let value = "";
        if (string) {
            const enumValue = pEnumValues.find((lValue) => { return lValue.name === string; });
            if (enumValue) {
                value = enumValue.name;
                result = true;
            }
        } else {
            const enumValue = pEnumValues.find((lValue) => { return lValue.default; });
            if (enumValue) {
                value = "";
                result = true;
            }
        }
        if (!result)
            if (pDefaultValue)
                value = pDefaultValue;
            else
                throw new Error(`Value ${pString} cannot be parsed into ${pEnumName}.`);
        return value;
    }
}

module.exports = Enum;