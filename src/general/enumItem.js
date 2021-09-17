/**
 * @module "EnumItem" class
 * @description Represents enum value
 * @version 0.0.1 (2021-09-17)
 */

import "./javaScript.js";

export default class EnumItem {
    get value() { return this.mValue; }
    get string() { return this.mString; }

    constructor(pValue, pString) {
        this.mValue = String.validate(pValue);
        this.mString = String.validate(pString);
    }
}