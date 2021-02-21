/**
 * @module "DynamicsAppIdRanges" class (static)
 * @description Represents an array of ID ranges
 * @version 0.0.1 (2021-02-19)
 */

include("/general/javaScript");

const DynamicsAppIdRange = include("/dynamics/dynamicsAppIdRange");

class DynamicsAppIdRanges extends Array {
    constructor() {      
        super()          
    }

    log(pIndentation) {
        const logger = global.application.logger;
        logger.writeText("ID Ranges:", pIndentation);
        for (const dynamicsAppIdRange of this)
            logger.writeText(dynamicsAppIdRange.toString(), pIndentation + logger.tab);
    }

    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : []);
    } 
    
    static deserialise(pData) {
        let dynamicsAppIdRanges = new DynamicsAppIdRanges();
        if (pData != null)
            for (const data of pData)
                dynamicsAppIdRanges.push(DynamicsAppIdRange.deserialise(data));
        return dynamicsAppIdRanges;
    }
}

module.exports = DynamicsAppIdRange;