/**
 * @module "DynamicsAppIdRange" class
 * @description Represents one Dynamics application range
 * @version 0.0.1 (2021-02-19)
 */

require("../general/javaScript");

const StringBuilder = require("../general/stringBuilder");

class DynamicsAppIdRange {
    get from() { return this.mFrom; }
    get to() { return this.mTo; }
    get renumberedFrom() { return this.mRenumberedFrom; }
    set renumberedFrom(pValue) { this.mRenumberedFrom = pValue; }
    get renumberedTo() { return this.mRenumberedTo; }
    set renumberedTo(pValue) { this.mRenumberedTo = pValue; }

    constructor(pFrom, pTo, pRenumberedFrom, pRenumberedTo) {
        this.mFrom = Number.default(pFrom);
        this.mTo = Number.default(pTo);
        this.mRenumberedFrom = Number.default(pRenumberedFrom);
        this.mRenumberedTo = Number.default(pRenumberedTo);
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

module.exports = DynamicsAppIdRange;