/**
 * @module "DynamicsRange" class
 * @description Represents one Dynamics range (of numbers / IDs)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsRange {
    get from() { return this.mFrom; }
    get to() { return this.mTo; }

    constructor(pFrom, pTo) {
        this.mFrom = Number.validate(pFrom);
        this.mTo = Number.validate(pTo);
    }
    
    toString() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("From", this.from);
        stringBuilder.addNameValue("To", this.to);
        return stringBuilder.toString();        
    }

    validate(pValidator, pRaiseError) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        validator.testNotEmpty(DynamicsRange.name, "From", this.from);
        validator.testNotEmpty(DynamicsRange.name, "To", this.to);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   

    serialise() {
        return {
            "from": this.from,
            "to": this.to
        };
    }
}
