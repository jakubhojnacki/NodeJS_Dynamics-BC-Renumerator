/**
 * @module "Validator" class
 * @description Validates various properties and keeps information about results
 * @version 0.0.1 (2021-09-17)
 */

import "../general/javaScript.js";
import ValidatorError from "./validatorError.js";

export default class Validator {
    get errors() { return this.mErrors; }
    get isSuccess() { return (this.errors.length == 0); }

    constructor() {
        this.mErrors = [];
    }    

    addError(pClass, pProperty, pMessage) {
        this.errors.push(new ValidatorError(pClass, pProperty, pMessage));
    }   

    testEmpty(pClass, pProperty, pValue) {
        let result = true;
        if (pValue) {
            this.addError(pClass, pProperty, "must be empty");
            result = false;
        }
        return result;
    }

    testNotEmpty(pClass, pProperty, pValue) {
        let result = true;
        if (!pValue) {
            this.addError(pClass, pProperty, "can't be empty");
            result = false;
        }
        return result;
    }

    test(pClass, pProperty, pValue, pValidValues) {
        let result = false;
        const validValues = Array.isArray(pValidValues) ? pValidValues : [ pValidValues ];
        for (const validValue of validValues)
            if (pValue === validValue) {
                result = true;
                break;
            }
        if (!result)
            this.addError(pClass, pProperty, "doesn't have a valid value");
        return result;
    }

    toString() {
        let string = "";
        let first = true;
        for (const result of this.errors) {
            string += first ? "" : "\r\n";
            string += result.toString();
            first = false;
        }
        return string;
    }

    raiseErrorIfNotSuccess() {
        if (!this.isSuccess)
            throw new Error(this.toString());
    }
}