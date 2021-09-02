/**
 * @module "DynamicsAppDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
const DynamicsAppDependency = require("./dynamicsAppDependency");
const Guid = require("../general/guid");

export default class DynamicsAppDependencies extends Array {
    constructor() {        
        super();
    }

    log(pIndentation) {
        const logger = global.application.logger;
        let indentation = Number.default(pIndentation);
        logger.writeText("Dependencies:", indentation);
        for (const dynamicsAppDependency of this)
            logger.writeText(dynamicsAppDependency.toString(), indentation + logger.tab);
    }
    
    static deserialise(pData) {
        let dynamicsAppDependencies = new DynamicsAppDependencies();
        if (pData != null)
            for (const data of pData)
                dynamicsAppDependencies.push(DynamicsAppDependency.deserialise(data));
        return dynamicsAppDependencies;
    }    

    inject(pData) {
        for (let data of pData) {
            const dataId = Guid.default(data.id, data.appId);
            const dependency = this.find((lDependency) => { return lDependency.id === dataId; });
            if (dependency)
                dependency.inject(data);
        }
    }
}
