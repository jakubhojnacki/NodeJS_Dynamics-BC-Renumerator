/**
 * @module "DynamicsRange" class
 * @description Represents one Dynamics range (of numbers / IDs)
 */

import { StringBuilder } from "core-library";

export class DynamicsRange {
    get from() { return this.mFrom; }
    set from(pValue) { this.mFrom = Number.validateAsInteger(pValue); }
    get to() { return this.mTo; }
    set to(pValue) { this.mTo = Number.validateAsInteger(pValue); }

    constructor(pFrom, pTo) {
        this.from = pFrom;
        this.to = pTo;
    }
    
    toString() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("From", this.from);
        stringBuilder.addNameValue("To", this.to);
        return stringBuilder.toString();        
    }

    //TODO - Review
    validate(pValidator, pRaiseError) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        validator.testNotEmpty(DynamicsRange.name, "From", this.from);
        validator.testNotEmpty(DynamicsRange.name, "To", this.to);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   

    //TODO - Review
    serialise() {
        return {
            "from": this.from,
            "to": this.to
        };
    }
}
