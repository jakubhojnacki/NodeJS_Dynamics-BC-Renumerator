/**
 * @module "DynamicsAppDependencies" class (static)
 * @description Used only to operate on array of dependencies
 * @version 0.0.1 (2021-02-19)
 */

const DynamicsAppDependency = include("/dynamicsAppDependency");
include("/general/javaScript");

/*static*/ class DynamicsAppDependencies {
    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : []);
    } 
    
    static deserialise(pData) {
        let dynamicsAppDependencies = [];
        for (const data of pData)
            dynamicsAppDependencies.push(DynamicsAppDependency.deserialise(data));
        return dynamicsAppDependencies;
    }    
}

module.exports = DynamicsAppDependencies;