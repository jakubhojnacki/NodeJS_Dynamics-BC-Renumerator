/**
 * @module "Arg" class
 * @description Class representing one application argument
 * @version 0.0.1 (2021-02-17)
 */

__require("general/javaScript");
const StringBuilder = __require("general/stringBuilder");

class Arg {
    get name() { return this.mName; }
    get value() { return this.mValue; }
    get valid() { return this.mValid; }
    set valid(pValue) { this.mValid = pValue; }

    constructor(pName, pValue) {
        this.mName = String.default(pName);
        this.mValue = pValue;
        this.mValid = true;
    }

    toString() {
        return StringBuilder.nameValue(this.name, this.value);
    }
}

module.exports = Arg;