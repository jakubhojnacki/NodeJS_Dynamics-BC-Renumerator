/**
 * @module "DynamicsIdRange" class
 * @description Represents one Dynamics ID range
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsIdRange {
    get from() { return this.mFrom; }
    get to() { return this.mTo; }
    get renumberedFrom() { return this.mRenumberedFrom; }
    set renumberedFrom(pValue) { this.mRenumberedFrom = pValue; }
    get renumberedTo() { return this.mRenumberedTo; }
    set renumberedTo(pValue) { this.mRenumberedTo = pValue; }

    constructor(pFrom, pTo, pRenumberedFrom, pRenumberedTo) {
        this.mFrom = Number.validate(pFrom);
        this.mTo = Number.validate(pTo);
        this.mRenumberedFrom = Number.validate(pRenumberedFrom);
        this.mRenumberedTo = Number.validate(pRenumberedTo);
    }
    
    toString() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("From", this.from);
        stringBuilder.addNameValue("To", this.to);
        return stringBuilder.toString();        
    }

    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        const withRenumbered = Boolean.validate(pWithRenumbered);
        validator.testNotEmpty(DynamicsIdRange.name, "From", this.from);
        validator.testNotEmpty(DynamicsIdRange.name, "To", this.to);
        if (withRenumbered) {
            validator.testNotEmpty(DynamicsIdRange.name, "Renumbered From", this.renumberedFrom);
            validator.testNotEmpty(DynamicsIdRange.name, "Renumbered To", this.renumberedTo);
        }
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   

    serialise() {
        return {
            "from": this.from,
            "to": this.to,
            "renumberedFrom": this.renumberedFrom,
            "renumberedTo": this.renumberedTo
        };
    }
}
