/**
 * @module "DynamicsAppIdRange" class
 * @description Represents one Dynamics application range
 * @version 0.0.1 (2021-02-19)
 */

include("/general/javaScript");

class DynamicsAppIdRange {
    get from() { return this.mFrom; }
    get to() { return this.mTo; }

    constructor(pFrom, pTo) {
        this.mFrom = Number.default(pFrom);
        this.mTo = Number.default(pTo);
    }

    static deserialise(pData) {
        let dynamicsAppIdRange = new DynamicsAppIdRange();
        dynamicsAppIdRange.mFrom = Number.default(pData.from);
        dynamicsAppIdRange.mTo = Number.default(pData.to);
        return dynamicsAppIdRange;
    }
}

module.exports = DynamicsAppIdRange;