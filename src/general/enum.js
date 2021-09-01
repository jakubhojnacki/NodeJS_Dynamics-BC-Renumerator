/**
 * @module "Enum" class
 * @description Enum helper class (static)
 * @version 0.0.2 (2021-05-25)
 */

import "./javaScript.js";

export default class Enum {
    static parse(pText, pValues, pEnumName) {
        const text = String.validate(pText).trim().toLowerCase();
        let value = null;
        if (text)
            value = pValues.find((lValue) => { return lValue.toLowerCase() === text; });
        else
            value = pValues[0];
        if (!value)
            throw new Error(`Value ${pText} cannot be parsed into ${pEnumName}.`);
        return value;
    }
}
