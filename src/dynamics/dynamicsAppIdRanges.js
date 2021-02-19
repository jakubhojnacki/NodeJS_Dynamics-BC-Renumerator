/**
 * @module "DynamicsAppIdRanges" class (static)
 * @description Used only to manipulate an array of ID ranges
 * @version 0.0.1 (2021-02-19)
 */

const DynamicsAppIdRange = include("/dynamics/dynamicsAppIdRange");

class DynamicsAppIdRanges {
    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : []);
    } 
    
    static deserialise(pData) {
        let dynamicsAppIdRanges = [];
        for (const data of pData)
            dynamicsAppIdRanges.push(DynamicsAppIdRange.deserialise(data));
        return dynamicsAppIdRanges;
    }
}

module.exports = DynamicsAppIdRange;