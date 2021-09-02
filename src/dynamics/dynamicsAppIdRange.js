/**
 * @module "DynamicsAppIdRange" class
 * @description Represents one Dynamics application range
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsAppIdRange {
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

    static deserialise(pData) {
        let dynamicsAppIdRange = null;
        if (pData != null)
            dynamicsAppIdRange = new DynamicsAppIdRange(pData.from, pData.to);
        return dynamicsAppIdRange;
    }

    inject(pData) {
        pData.from = this.renumberedFrom;
        pData.to = this.renumberedTo;
    }

    toString() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("From", this.from);
        stringBuilder.addNameValue("To", this.to);
        return stringBuilder.toString();        
    }
}
