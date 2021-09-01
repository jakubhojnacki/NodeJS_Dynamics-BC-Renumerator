/**
 * @module "EnumValue" class
 * @description Representing one enum value
 * @version 0.0.1 (2021-02-21)
 */

require("./javaScript");

class EnumValue {
    get name() { return this.mName; }
    get default() { return this.mDefault; }

    constructor(pName, pDefault) {
        this.mName = String.default(pName);
        this.mDefault = Boolean.default(pDefault);
    }
}

module.exports = EnumValue;