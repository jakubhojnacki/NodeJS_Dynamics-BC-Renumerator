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

    validate(pValidator) {
        pValidator.setComponent(DynamicsRange.name);
        pValidator.testNotEmpty("From", this.from);
        pValidator.testNotEmpty("To", this.to);
        pValidator.restoreComponent();
    }   

    toData() {
        return {
            "from": this.from,
            "to": this.to
        };
    }
}
