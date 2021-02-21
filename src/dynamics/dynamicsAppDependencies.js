/**
 * @module "DynamicsAppDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.1 (2021-02-19)
 */

include("/general/javaScript");

const DynamicsAppDependency = include("/dynamics/dynamicsAppDependency");

class DynamicsAppDependencies extends Array {
    constructor() {        
        super()
    }

    log(pIndentation) {
        const logger = global.application.logger;
        logger.writeText("Dependencies:", pIndentation);
        for (const dynamicsAppDependency of this)
            logger.writeText(dynamicsAppDependency.toString(), pIndentation + logger.tab);
    }

    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : []);
    } 
    
    static deserialise(pData) {
        let dynamicsAppDependencies = new DynamicsAppDependencies();
        if (pData != null)
            for (const data of pData)
                dynamicsAppDependencies.push(DynamicsAppDependency.deserialise(data));
        return dynamicsAppDependencies;
    }    
}

module.exports = DynamicsAppDependencies;