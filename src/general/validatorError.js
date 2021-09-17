/**
 * @module "ValidatorError" class
 * @description Contains information about validation error
 * @version 0.0.1 (2021-09-17)
 */

import "./javaScript.js";

export default class ValidatorError {
    get class() { return this.mClass; }
    get property() { return this.mProperty; }
    get message() { return this.mMessage; }

    constructor(pClass, pProperty, pMessage) {
        this.mClass = String.validate(pClass);
        this.mProperty = String.validate(pProperty);
        this.mMessage = String.validate(pMessage);
    }

    toString() {
        let prefix = this.class ? `[${this.class}]` : "";
        if (this.property) {
            if (prefix)
                prefix += " "
            prefix += `"${this.property}"`;
        }
        if (prefix)        
            prefix += " "
        return `${prefix}${this.message}`
    }
}